import React, { useState, useEffect } from 'react';
import historyservices from '../../services/historyservices';
import PieChart from '../../chart/PieChart';
import BarChart from '../../chart/BarChart';

const History = () => {
  const [historyRecords, setHistoryRecords] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')); // Extract userId here
  const userId = user._id;

  const fetchHistory = async () => {
    try {
      console.log("as", user);
      const result = await historyservices.read(userId);
    
      console.log("History result", result);

      // Ensure result is an array
      if (Array.isArray(result)) {
        setHistoryRecords(result);
      } else {
        console.error('Expected an array from the API', result);
        setHistoryRecords([]);
      }

    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleView = (record) => {
    setSelectedHistory(record);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedHistory(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Executed At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NLP Processing Time (ms)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Receiving Time (ms)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Return Time (ms)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Execution Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyRecords.map((record) => (
              <tr key={record._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.nlp_end) - new Date(record.nlp_start)} ms</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.nlp_start) - new Date(record.request_in)} ms</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.request_ret) - new Date(record.nlp_end)} ms</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(record.request_ret) - new Date(record.request_in)} ms</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleView(record)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BarChart data={historyRecords} /> {/* Add the LineChart component here */}

      {showPopup && selectedHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Query Details</h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96 flex-1">
                <p><strong>Executed at:</strong> {new Date(selectedHistory.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
                <p><strong>NLP Processing Time :</strong> {new Date(selectedHistory.nlp_end) - new Date(selectedHistory.nlp_start)} ms</p>
                <p><strong>Request Receiving Time :</strong> {new Date(selectedHistory.request_in) - new Date(selectedHistory.nlp_start)} ms</p>
                <p><strong>NLP Processing Time :</strong> {new Date(selectedHistory.nlp_end) - new Date(selectedHistory.request_ret)} ms</p>
                <p><strong>Query:</strong> <span className="break-words">{selectedHistory.query}</span></p>
                <p><strong>Response:</strong> <span className="break-words">{selectedHistory.response}</span></p>
              </div>
              <div className="flex-1 lg:w-1/2">
                <PieChart
                  colors={['#FF6384', '#36A2EB', '#FFCE56']}
                  labels={['Request In to NLP Start', 'NLP Start to Request Return', 'Request Return to NLP End']}
                  state={false}
                  Data={selectedHistory}
                />
              </div>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
