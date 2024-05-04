import PreviewProfileForm from "./components/preview-profile-ui";
import TopPreviewProfile from "./components/top-preview-profile";

export default async function PreviewProfile() {
    return (
        <section>
            <TopPreviewProfile />
            <PreviewProfileForm />
        </section>
    );
}
