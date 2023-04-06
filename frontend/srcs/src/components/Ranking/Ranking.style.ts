import styled from "styled-components";

export const RankingTable = styled.table`
  width: 100%;
  height: 100%;

  td {
    padding: 12px;
  }

  tr {
    border-radius: 8px;

  }

  thead {
    display: block;
  }

  tbody {
    overflow-y: auto;
    display: block;
  }
`;
