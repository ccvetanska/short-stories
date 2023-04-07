import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = ({
    stories,
}) => {
    return (
        <section id="catalog-page">
            <h1>All Stories</h1>

            {stories.map(x =>
                <CatalogItem key={x._id} {...x} />
            )}

            {stories.length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )}
        </section>
    );
};