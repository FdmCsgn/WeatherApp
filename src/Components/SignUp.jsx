import React, { useState } from "react";
import { Flex, Box, Heading, FormControl, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import singupImg from '../assets/icons/singupimg.png';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Önceki hataları temizle

    // Form verilerini doğrula
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.username || !formData.password || !formData.passwordConfirm) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Parolalar eşleşmiyor!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5174/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("Kayıt başarılı!");
        navigate('/WeatherApp'); // Ana sayfaya yönlendirme
      } else {
        alert("Kayıt başarısız oldu.");
      }
    } catch (error) {
      console.error("Kayıt sırasında hata:", error);
      setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box pt={10}>
          <Box my={12} textAlign='center' mt='12'>
            <form onSubmit={handleSubmit} className="LoginglassCard">
              <Heading className="Fontfamily">Sign Up</Heading>
              <img src={singupImg} alt="" className="login-png" />
              <FormControl mt='12' mb='5'>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="e-mail"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="First Name"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Last Name"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="User Name"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Password"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12'>
                <Input
                  name="passwordConfirm"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Password Confirm"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}

              <button type="submit" className="signUp rounded-full hover:bg-green-700">
                Sign Up
              </button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
