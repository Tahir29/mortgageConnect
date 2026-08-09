/**
 * Renders a structured-data <script> tag.
 *
 * `<` is escaped to its unicode form so a stray "</script>" inside any string
 * value can't break out of the tag — this is the sanitization step Next's
 * JSON-LD guide calls for when using JSON.stringify.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
