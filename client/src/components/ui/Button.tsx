import React from "react";

import "./Button.css";

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: "primary" | "secondary" | "terciary";
}

export default function Button({ variant = "primary", ...rest }: ButtonProps) {
	return <button className={`btn btn-${variant}`} {...rest} />;
}
