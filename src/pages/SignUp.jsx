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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/user";



export default function SignUp() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		phone_number: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordError, setPasswordError] = useState("");
	const [submitStatus, setSubmitStatus] = useState({
		type: "",
		message: "",
	});

	const isPasswordMismatch =
		formData.confirmPassword.length > 0 &&
		formData.password !== formData.confirmPassword;

	const handleChange = (event) => {
		const { name, value } = event.target;
		const nextValue =
			name === "phone_number"
				? value.replace(/\D/g, "").slice(0, 10)
				: value;
		setFormData((prev) => ({
			...prev,
			[name]: nextValue,
		}));

		if (passwordError) {
			setPasswordError("");
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitStatus({ type: "", message: "" });

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match.");
			return;
		}

		try {
			const payload = {
				first_name: formData.first_name,
				last_name: formData.last_name,
				phone_number: formData.phone_number,
				username: formData.username,
				email: formData.email,
				password: formData.password,
			};

			await signup(payload);
			setSubmitStatus({ type: "success", message: "Sign up successful!" });
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (error) {
			setSubmitStatus({ type: "error", message: "Sign up failed. Please try again." });
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10 mt-16">
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
							<Label htmlFor="first_name">First name</Label>
							<Input
								id="first_name"
								name="first_name"
								type="text"
								value={formData.first_name}
								onChange={handleChange}
								placeholder="Enter your first name"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="last_name">Lsat name</Label>
							<Input
								id="last_name"
								name="last_name"
								type="text"
								value={formData.last_name}
								onChange={handleChange}
								placeholder="Enter your lsat name"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone_number">Phone number</Label>
							<Input
								id="phone_number"
								name="phone_number"
								type="tel"
								value={formData.phone_number}
								onChange={handleChange}
								placeholder="Enter your phone number"
								inputMode="numeric"
								maxLength={10}
								pattern="[0-9]{10}"
							/>
						</div>

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

						{submitStatus.message && (
							<Alert variant={submitStatus.type === "error" ? "destructive" : "default"}>
								<AlertTitle>{submitStatus.type === "error" ? "Error" : "Success"}</AlertTitle>
								<AlertDescription>{submitStatus.message}</AlertDescription>
							</Alert>
						)}

						<Button type="submit" className="w-full" disabled={isPasswordMismatch}>
							Sign up
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
