import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Book list',
    description: 'Max Book List App',
}

const BookPageLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default BookPageLayout;
