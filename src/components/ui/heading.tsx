type Props = {
  title: string;
  description: string;
};

export const Heading = ({ title, description }: Props) => {
  return (
    <div>
      <h2 className="font-bold text-3xl tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
