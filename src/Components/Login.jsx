import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Heading, FormControl, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import loginimg from "../assets/images/loginimg.png";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    kullanıcıadı:""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth kancasından login fonksiyonunu alın

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.kullanıcıadı) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5175/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        login(); // AuthContext'teki login fonksiyonunu çağır
        navigate("/WeatherApp"); // Başarılı giriş sonrasında yönlendirme
      } else {
        setError("Giriş başarısız oldu.");
      }
    } catch (error) {
      console.error("Giriş sırasında hata:", error);
      setError("Giriş sırasında bir hata oluştu.");
    }
  };

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10}>
        <Box my={12} textAlign="center" mt="12">
          <form onSubmit={handleSubmit} className="LoginglassCard">
            <Heading className="Fontfamily">
                Log In
            </Heading>
            <img src={loginimg} alt="Login" className="login-png" />
            <FormControl mt="12" mb="5">
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="forms rounded-full mt-5"
                placeholder="E-mail"
                textAlign="center"
                color="black"
              />
            </FormControl>
            <FormControl mt="12" mb="12">
              <Input
                name="kullanıcıadı"
                type="text"
                value={formData.kullanıcıadı}
                onChange={handleChange}
                className="forms rounded-full"
                placeholder="Kullanıcı Adı"
                style={{ textAlign: 'center', color: 'black' }}
              />
            </FormControl>
            <FormControl mt="12" mb="12">
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="forms rounded-full"
                placeholder="Password"
                textAlign="center"
                color="black"
              />
            </FormControl>
            {error && <Box color="red" mb="4">{error}</Box>}
            <div className="flex justify-center">
              <span>
                <Link to="/ForgotPass" className="text-blue-500">
                  Forgot Password?
                </Link>
              </span>
            </div>
            <div>
              <button type="submit" className="signUp rounded-full hover:bg-green-700">
                Log In
              </button>
            </div>
            <div className="mb-5">
              <span>
                New Here?{" "}
                <Link to="/SignUp" className="text-blue-500">
                  Create an Account
                </Link>
              </span>
            </div>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
