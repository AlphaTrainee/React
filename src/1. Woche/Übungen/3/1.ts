{
    export function TextVanish({ text }: Props) {
        if (!text) {
            return null;
        }
        const [textToRender, setTextToRender] = useState(text);
        useEffect(() => {
            setTimeout(() => setTextToRender(""), 5000);
        }, []);
        return <span>{textToRender}</span>;
    }
}