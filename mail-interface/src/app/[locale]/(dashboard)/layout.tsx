import { fetchProfile } from "@/actions/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/menu";
import { cookies } from "next/headers";
import SessionProvider from "@/components/session/SessionProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await fetchProfile();
  if (profile.status === "error") return redirect("/login?session=expired");
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
  return (
    <SessionProvider value={{ user: profile.data }}>
      <Container
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      >
        {children}
      </Container>
    </SessionProvider>
  );
}
