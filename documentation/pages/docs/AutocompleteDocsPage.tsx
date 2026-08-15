import { Autocomplete, Flex, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsList } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function AutocompleteDocsPage() {
  const usageSnippet = [
    "import { Autocomplete } from '@wlcr/base-ic';",
    "",
    '<Autocomplete',
    '  placeholder="Search frameworks…"',
    '  items={[',
    "    { value: 'react', label: 'React' },",
    "    { value: 'vue', label: 'Vue' },",
    "    { value: 'svelte', label: 'Svelte' },",
    "    { value: 'solid', label: 'Solid' },",
    "    { value: 'angular', label: 'Angular' },",
    '  ]}',
    '/>',
  ].join("\n");

  const childrenSnippet = [
    '<Autocomplete placeholder="Search a color…">',
    '  <Autocomplete.Item value="red">Red</Autocomplete.Item>',
    '  <Autocomplete.Item value="green">Green</Autocomplete.Item>',
    '  <Autocomplete.Item value="blue">Blue</Autocomplete.Item>',
    "</Autocomplete>",
  ].join("\n");

  const groupsSnippet = [
    '<Autocomplete',
    '  placeholder="Search a country…"',
    '  items={[',
    "    { label: 'Europe', items: [",
    "      { value: 'fr', label: 'France' },",
    "      { value: 'de', label: 'Germany' },",
    "      { value: 'es', label: 'Spain' },",
    "    ] },",
    "    { label: 'Americas', items: [",
    "      { value: 'us', label: 'United States' },",
    "      { value: 'ca', label: 'Canada' },",
    "      { value: 'br', label: 'Brazil' },",
    "    ] },",
    '  ]}',
    '/>',
  ].join("\n");

  const clearableSnippet = [
    '<Autocomplete',
    '  clearable',
    '  placeholder="Search fruit…"',
    '  items={[',
    "    { value: 'apple', label: 'Apple' },",
    "    { value: 'banana', label: 'Banana' },",
    "    { value: 'cherry', label: 'Cherry' },",
    '  ]}',
    '/>',
  ].join("\n");

  const emptySnippet = [
    '<Autocomplete',
    '  placeholder="Try typing \\"xyz\\"…"',
    '  emptyMessage="No matches. Try another search."',
    '  items={[',
    "    { value: 'html', label: 'HTML' },",
    "    { value: 'css', label: 'CSS' },",
    "    { value: 'js', label: 'JavaScript' },",
    '  ]}',
    '/>',
  ].join("\n");

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "kr", label: "South Korea" },
    { value: "au", label: "Australia" },
  ];

  const groupedCountries = [
    {
      label: "Europe",
      items: [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "es", label: "Spain" },
        { value: "it", label: "Italy" },
      ],
    },
    {
      label: "Americas",
      items: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "mx", label: "Mexico" },
        { value: "br", label: "Brazil" },
      ],
    },
    {
      label: "Asia-Pacific",
      items: [
        { value: "jp", label: "Japan" },
        { value: "kr", label: "South Korea" },
        { value: "au", label: "Australia" },
      ],
    },
  ];

  return (
    <>
      <DocsSection>
        <Heading as="h1">Autocomplete</Heading>
        <Text as="p">
          A free-text input that filters a dropdown list of suggestions as
          the user types. Unlike <code>Select</code>, the trigger is a real
          text field rather than a fixed-choice button. Built on Base UI's
          Autocomplete primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h3">Built On Base-UI</Heading>
        <Text as="p">
          This component wraps the Base UI Autocomplete primitive (which
          shares its plumbing with Base UI's Combobox). Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/autocomplete"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/autocomplete
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic"
            description="Filters a flat list of items as you type."
            code={usageSnippet}
          >
            <Autocomplete placeholder="Search frameworks…" items={countries} />
          </DemoCard>
          <DemoCard
            title="Item Children"
            description="Derive items from Autocomplete.Item children instead of an `items` prop."
            code={childrenSnippet}
          >
            <Autocomplete placeholder="Search a color…">
              <Autocomplete.Item value="red">Red</Autocomplete.Item>
              <Autocomplete.Item value="green">Green</Autocomplete.Item>
              <Autocomplete.Item value="blue">Blue</Autocomplete.Item>
              <Autocomplete.Item value="purple">Purple</Autocomplete.Item>
            </Autocomplete>
          </DemoCard>
          <DemoCard
            title="Grouped Items"
            description="Organize suggestions into labeled groups."
            code={groupsSnippet}
          >
            <Autocomplete placeholder="Search a country…" items={groupedCountries} />
          </DemoCard>
          <DemoCard
            title="Clearable"
            description="Show a clear button once the input has text."
            code={clearableSnippet}
          >
            <Autocomplete
              clearable
              placeholder="Search fruit…"
              items={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
                { value: "cherry", label: "Cherry" },
                { value: "date", label: "Date" },
              ]}
            />
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="Four sizes matching the Input and Button scale."
            code={'<Autocomplete size="1" items={items} />\n<Autocomplete size="2" items={items} />\n<Autocomplete size="3" items={items} />'}
          >
            <Flex direction="column" gap={2} style={{ width: "100%" }}>
              {(["1", "2", "3", "4"] as const).map((size) => (
                <Autocomplete
                  key={size}
                  size={size}
                  placeholder={`Size ${size}`}
                  items={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                  ]}
                />
              ))}
            </Flex>
          </DemoCard>
          <DemoCard
            title="Empty State"
            description="Customize the message shown when no items match."
            code={emptySnippet}
          >
            <Autocomplete
              placeholder='Try typing "xyz"…'
              emptyMessage="No matches. Try another search."
              items={[
                { value: "html", label: "HTML" },
                { value: "css", label: "CSS" },
                { value: "js", label: "JavaScript" },
              ]}
            />
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Autocomplete Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            Pass an explicit <code>items</code> array of{" "}
            <code>{"{ value, label }"}</code> objects (or grouped{" "}
            <code>{"{ label, items }"}</code> objects) for data-driven lists,
            or write static <code>Autocomplete.Item</code> /{" "}
            <code>Autocomplete.Group</code> children for a Select-like DX.
          </li>
          <li>
            Filtering happens against each item's label as the user types.
          </li>
          <li>
            Use <code>clearable</code> to show a clear button once the input
            has text.
          </li>
          <li>
            <code>emptyMessage</code> controls the "no results" state,
            rendered via Base UI Combobox's shared <code>Empty</code> part.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
