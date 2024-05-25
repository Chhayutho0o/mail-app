import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	form?: any;
	field?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ field, form: { touched, errors }, className, type, ...props }, ref) => {
		return (
			<>
				<input
					{...field}
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{touched[field.name] && errors[field.name] && (
					<div className="text-xs mt-1 ml-1 text-rose-500">
						{errors[field.name]}
					</div>
				)}
			</>
		);
	}
);
Input.displayName = "Input";

export { Input };
