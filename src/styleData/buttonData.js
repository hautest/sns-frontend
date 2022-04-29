export const sizeButtonStyleData = (props) => {
  switch (props.size) {
    case "lg":
      return lgSizeButtonStyleData;
    case "md":
      return mdSizeButtonStyleData;
    case "sm":
      return smSizeButtonStyleData;
    case "xs":
      return xsSizeButtonStyleData;
    default:
      break;
  }
};

const lgSizeButtonStyleData = {
  "min-height": "48px",
  "min-width": "107px",
  padding: "10px 24px 10px 24px",
};

const mdSizeButtonStyleData = {
  "min-height": "40px",
  "min-width": "84px",
  padding: "10px 16px 10px 16px",
};

const smSizeButtonStyleData = {
  "min-height": "32px",
  "min-width": "70px",
  padding: "10px 12px 10px 12px",
};

const xsSizeButtonStyleData = {
  "min-height": "24px",
  "min-width": "55px",
  padding: "10px 8px 10px 8px",
};

export const buttonChildData = (props) => {
  switch (props.size) {
    case "lg":
      return buttonChildArr[0].lg;
    case "md":
      return buttonChildArr[1].md;
    case "sm":
      return buttonChildArr[2].sm;
    case "xs":
      return buttonChildArr[3].xs;
    default:
      break;
  }
};

const buttonChildArr = [
  { lg: { "font-size": "18px", "line-height": "28px" } },
  { md: { "font-size": "16px", "line-height": "24px" } },
  { sm: { "font-size": "14px", "line-height": "20px" } },
  { xs: { "font-size": "12px", "line-height": "16px" } },
];
