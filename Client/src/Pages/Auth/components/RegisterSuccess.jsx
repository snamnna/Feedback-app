const RegisterSuccess = () => {
  return (
    <div className="flex align-middle justify-center">
      <div className="p-10 border rounded-md m-20 max-w-2xl h-auto text-center">
        <h1 className="text-2xl font-semibold">
          You have successfully registered.
        </h1>
        <a href="/Login" className="btn btn-primary mt-5">
          Sign in to your account
        </a>
      </div>
    </div>
  );
};

export default RegisterSuccess;
