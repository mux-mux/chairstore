export type LogoProps = {
  size: number;
};

const Logo: React.FC<LogoProps> = ({ size }) => {
  return <img src="./logo.svg" alt="Logo" width={size} height={size} />;
};

export default Logo;
