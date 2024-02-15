interface SaluteProps {
  user: {
    nome: string;
  };
}

export function Salute({ user }: SaluteProps) {
  return <span className="header-user-tag">{user.nome}</span>;
}
