import AdminLayout from "@/components/layouts/AdminLayout";
import ProfileForm from "@/components/ProfileForm";

export default function Settings() {
	// https://github.com/viclafouch/mui-tel-input/blob/v3.1.1/src/shared/constants/countries.ts
	return (
		<AdminLayout>
			<ProfileForm />
		</AdminLayout>
	);
}
