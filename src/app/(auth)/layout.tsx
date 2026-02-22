const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="flex h-full w-1/2 items-center justify-center bg-white/80">{children}</div>
      <div className="h-full w-1/2"></div>
    </div>
  );
};

export default layout;
