import { useUser } from "../../../hooks/use-users";

interface DateUserProps {
  userId: string | undefined;
  text: string | undefined;
}

export const DateUser = ({ userId, text }: DateUserProps) => {
  const { user, loading } = useUser(userId);
  return (
    <>
      {!loading && text === userId
        ? user?.profile?.full_name || user?.email
        : text}
    </>
  );
};
