
import EventDetailsClient from "./eventdetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <h1 className="text-center mt-20">Event not found</h1>;
  }

  const eventsData = await response.json();

 
  const event = eventsData.event || eventsData;

  return <EventDetailsClient event={event} />;
}
