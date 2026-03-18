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
import { Link, useNavigate } from "react-router-dom";
import { signin } from "@/api/user";

export default function SignIn() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await signin(formData);
			navigate("/dashboard");
		} catch (error) {
			console.error("Sign in failed", error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
			<Card className="w-full max-w-md border-slate-200 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>Enter your credentials to continue.</CardDescription>
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

						<Button type="submit" className="w-full">
							Sign in
						</Button>

						<p className="text-center text-sm text-slate-600">
							Don&apos;t have an account?{" "}
							<Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
								Sign up
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
            
		</div>
	);
}
