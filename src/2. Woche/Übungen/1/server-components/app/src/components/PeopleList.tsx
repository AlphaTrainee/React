// "use client";
export async function PeopleList() {
  const people = await getPeople();
  return (
    <ul>
      {people.map((person) => (
        <li key={person}>
          <span>{person}</span>
        </li>
      ))}
    </ul>
  );
}
