import CompanyLogo from "../components/company-logo";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>

            {children}
        </section>
    );
}
