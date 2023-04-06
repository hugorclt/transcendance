import styled from "styled-components";

export const RankingTable = styled.div`
  width: 100%;
  height: 100%;
`;

export const RankingBody = styled.div`
  height: calc(100vh - 205px);
  min-height: 395px;
  overflow-y: auto;
`;

export const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
`;

export const TableData = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  flex-basis: 100%;
`;
