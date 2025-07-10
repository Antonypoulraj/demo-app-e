import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}

// export default Index;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Index = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate("/login");
//   }, [navigate]);

//   return null;
// };

// export default Index;
