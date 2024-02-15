interface ClientNameProps {
  user: {
    name1: string;
  };
}

export function ClientName({ user }: ClientNameProps) {
  return <span className="header-user-tag">{user.name1}</span>;
}
