import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordError, setPasswordError] = useState("");

	const isPasswordMismatch =
		formData.confirmPassword.length > 0 &&
		formData.password !== formData.confirmPassword;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (passwordError) {
			setPasswordError("");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match.");
			return;
		}

		navigate("/");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
			<Card className="w-full max-w-md border-slate-200 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Create an account</CardTitle>
					<CardDescription>
						Enter your details to sign up.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								name="username"
								type="text"
								value={formData.username}
								onChange={handleChange}
								placeholder="Enter your username"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Enter your email"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
								placeholder="Confirm your password"
								aria-invalid={isPasswordMismatch || !!passwordError}
								required
							/>
							{(isPasswordMismatch || passwordError) && (
								<p className="text-sm text-red-600">{passwordError || "Passwords do not match."}</p>
							)}
						</div>

						<Button type="submit" className="w-full" disabled={isPasswordMismatch}>
							Sign up
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
