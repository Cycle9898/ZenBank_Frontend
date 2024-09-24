import { type FieldPath, type Control } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

type CustomInputProps = {
	control: Control<z.infer<typeof formSchema>>;
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	inputType?: "date" | "email" | "password" | "text";
	placeholder?: string;
};

function CustomInput({ control, name, label, inputType = "text", placeholder = "" }: CustomInputProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="form-item">
					<FormLabel className="form-label">{label}</FormLabel>

					<div className="flex flex-col w-full">
						<FormControl>
							<Input placeholder={placeholder} className="input-class" type={inputType} {...field} />
						</FormControl>

						<FormMessage className="form-message mt-2" />
					</div>
				</div>
			)}
		/>
	);
}

export default CustomInput;
