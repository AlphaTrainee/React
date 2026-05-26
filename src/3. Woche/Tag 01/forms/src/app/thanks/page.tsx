export default async function Thanks({searchParams}:
    {searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>}
) {
    return (
        <main>
            <h2>
                Formular erfolgreich abgeschickt
            </h2>
            <p>
                Danke {(await searchParams).name}, wir melden uns.
            </p>
        </main>
    )

}