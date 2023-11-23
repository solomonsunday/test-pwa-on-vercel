import Footer from "@/components/Footer";
import UserLayout from "@/components/layouts/UserLayout";
import ProfileForm from "@/components/ProfileForm";

export default function Profile() {
	return (
		<UserLayout className="'container mx-auto'">
			<>
				<ProfileForm />
				<Footer />
			</>
		</UserLayout>
	);
}
