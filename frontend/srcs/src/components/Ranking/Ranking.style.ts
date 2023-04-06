import styled from "styled-components";

export const RankingTable = styled.table`
  width: 100%;
  height: 100%;
  /* background-color: salmon; */

  thead {
    display: inline-block;
    width: 100%;
  }

  tbody {
    width: 100%;
    overflow-y: auto;
    display: block;
    height: calc(100vh - 205px);
  }

  tr {
    border-radius: 8px;
    width: 20%;
    background-color: red;
    /* display: inline-block; */
    /* display: flex; */
    /* justify-content: space-between; */
  }

  td {
    /* padding: 12px; */
    width: 35%;
    /* background-color: indigo; */
  }

  th {
    /* padding: 12px; */
    width: 35%;
  }
`;
