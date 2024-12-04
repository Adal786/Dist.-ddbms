// src/components/DataTable.js
import React, { useEffect, useState } from 'react';
import './Data.css';
import Dataservices from '../services/dataservices';

const Data = () => {

  return (
    <div className="data-table">
      <h1><b>Welcome to be App Guide!</b></h1>
      <br />
      <p className="text-justify">
        <span className="ps-12">This</span> app is designed to run <strong>SQL queries</strong> on distributed database systems and showcase
        execution time and performance metrics. By following these insights, SQL queries over distributed databases can be optimized for faster
        performance. The main feature of this application is its ability to present detailed geographical
        data, including coordinates (X, Y), transportation modes, and various facility attributes.
        At a glance, users can explore rich location-based data, ranging from airport codes to
        bike-sharing systems, all neatly organized for easy consumption. This application demonstrates how large-scale
        systems with high network traffic can utilized efficiently while maintaining optimal performance.
      </p>
      <br />

      <p className='text-justify'><span className='ps-12'>User</span> can run NLP as well Raw SQL query directly on be dataset. bere is such coloumns in be table, bese fields are &nbsp;
        <b>ID</b>, <b>OBJECTID</b>, <b>X</b>, <b>Y</b>, <b>FAC_ID</b>, <b>POINT_ID</b>, <b>NEAR_ID_1</b>, <b>NEAR_ID_2</b>, <b>NEAR_ID_3</b>,
        <b>AIR_CODE</b>, <b>AIR_CODE2</b>, <b>AMTRAKCODE</b>, <b>FERRY_CODE</b>, <b>RAIL_ID</b>, <b>BIKE_ID</b>, <b>DATE_UPDTE</b>, <b>ADDRESS</b>,
        <b>CITY</b>, <b>STATE</b>, <b>ZIPCODE</b>, <b>METRO_AREA</b>,  <b>FAC_NAME</b>, <b>FERRY_T</b>,
        <b>LONGITUDE</b>, <b>LATITUDE</b>, <b>POINT_LON</b>, <b>POINT_LAT</b>, <b>FAC_TYPE</b>, <b>FERRY_I</b>, <b>BUS_T</b>, <b>BUS_I</b>,
        <b>BUS_CODE_S</b>, <b>BUS_SUPP</b>, <b>RAIL_I</b>, <b>RAIL_C</b>, <b>RAIL_H</b>,  <b>RAIL_LIGHT</b>, <b>AIR_SERVE</b>, <b>BIKE_SHARE</b>,
        <b>BIKE_SYS_ID</b>, <b>BIKE_SYS</b>, <b>WEBSITE</b>, <b>NOTES</b>, <b>SOURCE</b>, <b>I_SERVICE</b>, <b>T_SERVICE</b>,
        <b>CBSA_CODE</b>,  <b>CBSA_TYPE</b>, <b>MODES_SERV</b>, <b>MODE_BUS</b>, <b>MODE_AIR</b>, <b>MODE_RAIL</b>, <b>MODE_FERRY</b>,
        <b>MODE_BIKE</b>, <b>x2</b>, <b>y2</b>. The table name is data and user's can directly run the sql query over that and the NLP query over the
        data set.
      </p>

      <br />
      <p className='text-justify'><span className='ps-12'>The</span> app's interface is designed with user experience in mind, offering an intuitive
        and easy-to-navigate interface. Whether you're a data analyst, the app makes it easy to access essential
        features without a steep learning curve. The interface is user friendly, allowing users to read and test one query than the next one 
        instead diverging thoughts to new previous. This setup ensures that users can quickly gain insights into key metrics, 
        streamlining the decision-making process and making it easier to track progress over time.</p>
      <br />

      <p className='text-justify'><span className='ps-12'>For</span> security and privacy, the app incorporates robust user authentication
       and role-based access controls. Sensitive data is protected, ensuring that only authorized users can access users data or perform certain actions. 
        This security framework helps maintain the integrity of the data.</p>
      <br />

      <p className='text-justify'><span className='ps-12'>Finally,</span> the app is built with future scalability in mind. As the volume of data grows 
      and new features are introduced, the app is capable of evolving to meet the needs of its users. The underlying architecture is designed for 
      demonstaration, ensuring that it remains a valuable sample as industries and data requirements continue to evolve.
       This future-proofing approach ensures that the app remains a long-term solution for managing and optimizing complex datasets.</p>

    </div>
  );
};

export default Data;
