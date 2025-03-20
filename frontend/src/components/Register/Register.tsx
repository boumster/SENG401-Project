import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Register.css";
import { registerUser } from "../../utilities/api";
import { useAuth } from "../../context/Auth/AuthProvider";
import { Button, Container, Input, Title } from "../../styles/styles";
import styled from "styled-components";

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
`;

const Description = styled.div`
  color: gray;
  font-size: 14px;
  margin-bottom: 0px;
  text-align: left;
`;

const BulletList = styled.ul`
  margin: 5px 0 0px 20px;
  padding: 0;
  list-style-type: disc;
`;

const HrLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
  margin: 20px 0;
`;

const RegisterContainer = styled(Container)`
  width: 600px;
`;

const RegisterButton = styled(Button)`
  width: 60%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  display: block;
`;



const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [finalPassword, setFinalPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store error messages

  const history = useHistory();
  const { loginUser: authLogin } = useAuth();

  // Email validation function
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation function (1 uppercase, 1 number, min 6 characters)
  const isValidPassword = (password: string) => /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  const handleRegister = async () => {
    let newErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username cannot be empty.";
    } else if (/\s/.test(username)) {
      newErrors.username = "Username cannot contain spaces.";
    }
    

    if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!isValidPassword(checkPassword)) {
      newErrors.password = "Password must have at least 6 characters, one uppercase letter, and one number.";
    }

    if (checkPassword !== finalPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors); // Update errors state

    // If no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      const userData = {
        username: username,
        email: email,
        password: checkPassword,
      };

      try {
        const response = await registerUser(userData);
        authLogin(response.user);
        alert("User registered successfully");
        history.push("/");
        
      } catch (error) {
        console.error("Registration failed:", error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <RegisterContainer className="register-container">
      <Title>Register User</Title>
      <Description>
        <BulletList>
          <li>Username is required</li>
          <li>Email must be in a valid format (e.g., user@example.com)</li>
          <li>Password must have at least 6 characters, one uppercase letter, and one number</li>
          <li>Passwords must match</li>
        </BulletList>
      </Description>

      <HrLine></HrLine>

        <Label htmlFor="username">Username</Label>
        {errors.username && <ErrorText>{errors.username}</ErrorText>}
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label htmlFor="email">Email</Label>
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />

        <Label htmlFor="confirm-password">Confirm Password</Label>
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={finalPassword}
          onChange={(e) => setFinalPassword(e.target.value)}
        />


        <RegisterButton className="register-button" onClick={handleRegister}>
          Register
        </RegisterButton>
        <RegisterButton className="register-button" onClick={() => history.push("/login")}>
          Go to Login
        </RegisterButton>

    </RegisterContainer>
  );
};

export default Register;
