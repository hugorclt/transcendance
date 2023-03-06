interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout = (props: LoginLayoutProps) => {
  return <main>{props.children}</main>;
};

export default LoginLayout;
