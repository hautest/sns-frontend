export const Icon = ({ icon, size }) => {
  return (
    <img width={size} alt={`${icon}아이콘입니다`} src={`img/${icon}.svg`} />
  );
};
