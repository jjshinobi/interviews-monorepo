import styled from "styled-components";

export const StyledBoard = styled.div<{
  width: number;
  height: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 20px);
  grid-template-rows: repeat(${(props) => props.height}, 20px);
  gap: 1px;
  background-color: #222;
  border: 3px solid #333;
  border-radius: 5px;
`;

export const Cell = styled.div<{
  type: "empty" | "head" | "body" | "food";
}>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) =>
    props.type === "head" ? "4px" : props.type === "body" ? "3px" : "2px"};
  background-color: ${(props) => {
    switch (props.type) {
      case "head":
        return "#4CAF50";
      case "body":
        return "#388E3C";
      case "food":
        return "#F44336";
      default:
        return "#EEE";
    }
  }};
`;
