import { Button, Dialog, DialogPrimitive, Flex, Heading, Input, Text, Textarea } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import { DocsDemoGrid, DocsDemoRow } from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function DialogDocsPage() {
  const usageSnippet = [
    "import { Dialog, DialogPrimitive, Button } from 'base-ic';",
    "",
    "<Dialog",
    '  title="Edit Profile"',
    '  description="Make changes to your account."',
    "  content={",
    "    <Input placeholder=\"Display name\" />",
    "  }",
    "  footer={",
    "    <>",
    "      <DialogPrimitive.Close",
    '        render={<Button variant="ghost">Cancel</Button>}',
    "      />",
    '      <Button variant="solid">Save</Button>',
    "    </>",
    "  }",
    ">",
    '  <Button>Open</Button>',
    "</Dialog>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading>Dialog</Heading>
        <Text as="p">
          A modal dialog with animated backdrop, accessible focus trapping, and
          keyboard dismissal. Built on Base UI's Dialog primitive.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Basic"
            description="Title, description, body content, and footer actions."
            code={usageSnippet}
          >
            <DocsDemoRow>
              <Dialog
                title="Edit Profile"
                description="Update your display name and email address."
                content={
                  <Flex direction="column" gap={3}>
                    <Input placeholder="Display name" defaultValue="Jane Smith" />
                    <Input placeholder="Email" type="email" defaultValue="jane@example.com" />
                  </Flex>
                }
                footer={
                  <>
                    <DialogPrimitive.Close
                      render={<Button variant="ghost">Cancel</Button>}
                    />
                    <Button variant="solid">Save changes</Button>
                  </>
                }
              >
                <Button variant="soft">Edit Profile</Button>
              </Dialog>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Sizes"
            description="small, medium (default), large."
            code={'<Dialog size="small" title="Confirm" ...>\n<Dialog size="large" title="Compose" ...>'}
          >
            <DocsDemoRow>
              <Dialog
                size="small"
                title="Confirm action"
                description="This will permanently delete the item and cannot be undone."
                footer={
                  <>
                    <DialogPrimitive.Close
                      render={<Button variant="ghost">Cancel</Button>}
                    />
                    <Button variant="solid" color="red">Delete</Button>
                  </>
                }
                content={null}
              >
                <Button variant="outline" size="2">Small</Button>
              </Dialog>
              <Dialog
                size="large"
                title="Compose Message"
                content={
                  <Flex direction="column" gap={3}>
                    <Input placeholder="To" />
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Body…" rows={5} />
                  </Flex>
                }
                footer={
                  <>
                    <DialogPrimitive.Close
                      render={<Button variant="ghost">Cancel</Button>}
                    />
                    <Button variant="solid">Send</Button>
                  </>
                }
              >
                <Button variant="outline" size="2">Large</Button>
              </Dialog>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="No close button"
            description="Set showClose={false} for alert-style dialogs."
            code={'<Dialog showClose={false} title="Session expiring" ...>'}
          >
            <DocsDemoRow>
              <Dialog
                showClose={false}
                title="Session expiring"
                description="Your session will expire in 5 minutes. Do you want to stay signed in?"
                footer={
                  <>
                    <DialogPrimitive.Close
                      render={<Button variant="ghost">Sign out</Button>}
                    />
                    <DialogPrimitive.Close
                      render={<Button variant="solid">Stay signed in</Button>}
                    />
                  </>
                }
                content={null}
              >
                <Button variant="outline">Alert Dialog</Button>
              </Dialog>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Usage</Heading>
        <CodeBlock title="Dialog Usage" code={usageSnippet} />
      </DocsSection>
    </>
  );
}
