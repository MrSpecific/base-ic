import { Card, Flex, Heading, Inset, Table, Text } from '../../../src';
import { CodeBlock } from '../../components/CodeBlock';
import { DocsDemoGrid } from '../../components/DocsPrimitives';
import { DocsSection } from '../../components/DocsSection';
import { PropsTable } from '../../components/PropsTable';
import { DemoCard } from './DemoCard';

/** Self-contained illustration so the demos don't depend on a network image. */
const COVER_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5b5bd6"/>
        <stop offset="1" stop-color="#f4a6c7"/>
      </linearGradient>
    </defs>
    <rect width="640" height="320" fill="url(#sky)"/>
    <circle cx="470" cy="120" r="46" fill="#ffe7a3"/>
    <path d="M0 250 L120 150 L210 220 L330 110 L470 240 L560 180 L640 230 L640 320 L0 320 Z" fill="#2b2a6b"/>
    <path d="M0 280 L150 210 L260 270 L400 200 L520 270 L640 240 L640 320 L0 320 Z" fill="#1a1947"/>
  </svg>`,
)}`;

const coverStyle = {
  display: 'block',
  objectFit: 'cover',
  width: '100%',
  height: 140,
} as const;

export function InsetDocsPage() {
  const usageSnippet = [
    "import { Card, Inset, Text } from '@wlcr/base-ic';",
    '',
    '<Card size="2" style={{ maxWidth: 260 }}>',
    '  <Inset side="top" clip="padding-box" pb="current">',
    '    <img',
    '      src="/cover.jpg"',
    '      alt="Mountains at dusk"',
    "      style={{ display: 'block', objectFit: 'cover', width: '100%', height: 140 }}",
    '    />',
    '  </Inset>',
    '  <Text as="p" size="3">',
    '    <strong>Typography</strong> is the art and technique of arranging type.',
    '  </Text>',
    '</Card>',
  ].join('\n');

  const sideSnippet = [
    '<Card size="2">',
    '  <Inset side="top" pb="current">',
    '    <img src="/cover.jpg" alt="" style={{ display: "block", width: "100%", height: 140, objectFit: "cover" }} />',
    '  </Inset>',
    '  <Text as="p">Bleeds to the top, left and right edges.</Text>',
    '</Card>',
    '',
    '<Card size="2">',
    '  <Flex>',
    '    <Inset side="left" pr="current">',
    '      <img src="/cover.jpg" alt="" style={{ display: "block", width: 120, height: "100%", objectFit: "cover" }} />',
    '    </Inset>',
    '    <Text as="p">Bleeds to the top, bottom and left edges.</Text>',
    '  </Flex>',
    '</Card>',
  ].join('\n');

  const clipSnippet = [
    '<Card size="3">',
    '  <Inset clip="border-box">…</Inset>   {/* covers the card border */}',
    '</Card>',
    '',
    '<Card size="3">',
    '  <Inset clip="padding-box">…</Inset>  {/* stops inside the border */}',
    '</Card>',
  ].join('\n');

  const tableSnippet = [
    '<Card size="2">',
    '  <Text as="p" weight="bold" mb="2">Recent sign-ups</Text>',
    '  <Inset side="x" clip="padding-box">',
    '    <Table.Root size="1">',
    '      <Table.Body>',
    '        <Table.Row>',
    '          <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>',
    '          <Table.Cell justify="end">Developer</Table.Cell>',
    '        </Table.Row>',
    '      </Table.Body>',
    '    </Table.Root>',
    '  </Inset>',
    '</Card>',
  ].join('\n');

  return (
    <>
      <DocsSection>
        <h1>Inset</h1>
        <p>
          `Inset` cancels the padding of the `Card` it sits in, so its content — an image, a map, a table — bleeds
          to the card's edge. Corners are rounded to match the card wherever two bled edges meet, and the inset
          clips its content to those corners.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Demo</h2>
        <DocsDemoGrid>
          <DemoCard
            title="Side"
            description="`side` picks which edges to bleed to: `all`, `x`, `y`, `top`, `bottom`, `left` or `right`. `top` bleeds to the top, left and right edges; `left` to the top, bottom and left."
            code={sideSnippet}
          >
            <Flex gap={4} wrap="wrap" align="start">
              <Card size="2" style={{ maxWidth: 260 }}>
                <Inset side="top" pb="current">
                  <img src={COVER_SRC} alt="Illustrated mountains at dusk" style={coverStyle} />
                </Inset>
                <Text as="p" size="3">
                  <strong>side="top"</strong> — the image spans the full card width.
                </Text>
              </Card>
              <Card size="2" style={{ maxWidth: 360 }}>
                <Flex>
                  <Inset side="left" pr="current" style={{ flexShrink: 0 }}>
                    <img
                      src={COVER_SRC}
                      alt="Illustrated mountains at dusk"
                      style={{ display: 'block', objectFit: 'cover', width: 112, height: '100%', minHeight: 120 }}
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <strong>side="left"</strong> — a media object with the image flush to the card's left edge.
                  </Text>
                </Flex>
              </Card>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Clip"
            description={'`clip="border-box"` (default) extends over the card\'s border to its outer edge; `padding-box` stops just inside the border so the card outline stays visible.'}
            code={clipSnippet}
          >
            <Flex gap={4} wrap="wrap" align="start">
              <Card size="3" variant="classic" style={{ width: 220 }}>
                <Inset clip="border-box" data-demo="inset-border-box">
                  <img src={COVER_SRC} alt="Illustrated mountains at dusk" style={coverStyle} />
                </Inset>
              </Card>
              <Card size="3" variant="classic" style={{ width: 220 }}>
                <Inset clip="padding-box" data-demo="inset-padding-box">
                  <img src={COVER_SRC} alt="Illustrated mountains at dusk" style={coverStyle} />
                </Inset>
              </Card>
            </Flex>
          </DemoCard>
          <DemoCard
            title="Bleeding a table"
            description={'`side="x"` lets a ghost table\'s row rules run edge to edge. A size 1 table pads its cells by `--space-2`, the same as a size 2 card, so the text still lines up with the heading.'}
            code={tableSnippet}
          >
            <Card size="2" style={{ maxWidth: 420 }}>
              <Text as="p" weight="bold" mb="2">
                Recent sign-ups
              </Text>
              <Inset side="x" clip="padding-box">
                <Table.Root size="1">
                  <Table.Body>
                    {[
                      ['Danilo Sousa', 'Developer'],
                      ['Zahra Ambessa', 'Admin'],
                      ['Jasper Eriksson', 'Developer'],
                    ].map(([name, role]) => (
                      <Table.Row key={name}>
                        <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
                        <Table.Cell justify="end">
                          {role}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Inset>
            </Card>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Inset Usage" code={usageSnippet} />
        <p>
          Inset reads the card's padding, border width and radius from inherited CSS custom properties, so it
          follows the card's `size`, `p`/`px`/`py`/… props, `radius` and the Theme's `scaling` automatically.
          Outside a `Card` it has no effect.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Accessibility</h2>
        <p>
          Inset is purely presentational — a `&lt;div&gt;` with negative margins — and adds no roles or semantics.
          Give bled images meaningful `alt` text (or `alt=""` when decorative), and keep the card's reading order
          sensible: content placed in an Inset is read where it appears in the DOM, not where it appears visually.
        </p>
      </DocsSection>
      <DocsSection>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'side',
              type: "'all' | 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'",
              default: "'all'",
              description: 'Edges to bleed to. `top`/`bottom` also bleed left and right; `left`/`right` also bleed top and bottom.',
            },
            {
              name: 'clip',
              type: "'border-box' | 'padding-box'",
              default: "'border-box'",
              description: 'Bleed over the card border to its outer edge, or stop just inside it.',
            },
            {
              name: 'p, px, py, pt, pr, pb, pl',
              type: "number | string | 'current'",
              description:
                'Padding inside the inset. Numbers and digit-only strings map to space tokens; `"current"` matches the card\'s own padding on that side.',
            },
            {
              name: 'render',
              type: 'React.ReactElement | ((props, state) => React.ReactElement)',
              description: 'Render as a different element while keeping Inset\'s styling.',
            },
          ]}
        />
      </DocsSection>
    </>
  );
}
