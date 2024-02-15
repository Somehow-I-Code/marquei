interface CompanyLogoProps {
  logo: {
    name: string;
  };
}

export function CompanyLogo({ logo }: CompanyLogoProps) {
  return (
    <div>
      <h1 className="companyLogo">{logo.name}</h1>
    </div>
  );
}
