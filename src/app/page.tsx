import { getLoginData } from "@/lib/auth";
import { cookies } from 'next/headers'

export default function Home() {

  const cookieStore = cookies();
  const data = cookieStore.get('user');

  return (
    <section className="min-h-screen">
      <p>
        {JSON.stringify(data)}
      </p>
    </section>
  );
}
