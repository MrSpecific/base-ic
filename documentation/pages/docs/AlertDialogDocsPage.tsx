import { AlertDialog, Button, Flex, Heading, Link, Text } from "../../../src";
import { CodeBlock } from "../../components/CodeBlock";
import {
  DocsDemoGrid,
  DocsDemoRow,
  DocsList,
} from "../../components/DocsPrimitives";
import { DocsSection } from "../../components/DocsSection";
import { DemoCard } from "./DemoCard";

export function AlertDialogDocsPage() {
  const usageSnippet = [
    "import { AlertDialog, Button } from 'base-ic';",
    "",
    "<AlertDialog",
    '  title="Delete project"',
    '  description="This action cannot be undone. The project and all its data will be permanently removed."',
    "  danger",
    '  confirmLabel="Delete"',
    "  onConfirm={() => console.log('confirmed')}",
    ">",
    "  <Button variant=\"outline\">Delete project</Button>",
    "</AlertDialog>",
  ].join("\n");

  const dangerSnippet = [
    "<AlertDialog",
    '  title="Delete account"',
    '  description="This is permanent and cannot be reversed."',
    "  danger",
    '  confirmLabel="Yes, delete my account"',
    ">",
    '  <Button color="red" variant="soft">Delete account</Button>',
    "</AlertDialog>",
  ].join("\n");

  const confirmSnippet = [
    "<AlertDialog",
    '  title="Publish changes"',
    '  description="Your changes will be live immediately."',
    '  confirmLabel="Publish"',
    ">",
    "  <Button>Publish</Button>",
    "</AlertDialog>",
  ].join("\n");

  return (
    <>
      <DocsSection>
        <Heading as="h1">AlertDialog</Heading>
        <Text as="p">
          A modal dialog that interrupts the user to confirm a consequential
          action. Unlike Dialog, AlertDialog includes built-in cancel and confirm
          actions and is semantically marked as an alert.
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Built On Base UI</Heading>
        <Text as="p">
          This component wraps the Base UI AlertDialog primitive. Base primitive
          docs:{" "}
          <Link
            href="https://base-ui.com/react/components/alert-dialog"
            target="_blank"
            rel="noreferrer"
          >
            base-ui.com/react/components/alert-dialog
          </Link>
          .
        </Text>
      </DocsSection>
      <DocsSection>
        <Heading>Demo</Heading>
        <DocsDemoGrid>
          <DemoCard
            title="Destructive action"
            description="Use danger=true to style the confirm button as a destructive red action."
            code={dangerSnippet}
          >
            <DocsDemoRow>
              <AlertDialog
                title="Delete account"
                description="This is permanent and cannot be reversed. All your data will be lost."
                danger
                confirmLabel="Yes, delete my account"
                onConfirm={() => {}}
              >
                <Button color="red" variant="soft">
                  Delete account
                </Button>
              </AlertDialog>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Confirmation"
            description="Use without danger for non-destructive confirmations."
            code={confirmSnippet}
          >
            <DocsDemoRow>
              <AlertDialog
                title="Publish changes"
                description="Your changes will be visible to all users immediately."
                confirmLabel="Publish"
                onConfirm={() => {}}
              >
                <Button>Publish</Button>
              </AlertDialog>
            </DocsDemoRow>
          </DemoCard>
          <DemoCard
            title="Custom labels"
            description="Override cancel and confirm button labels."
            code={
              '<AlertDialog\n  title="Leave page?"\n  description="You have unsaved changes."\n  cancelLabel="Stay"\n  confirmLabel="Leave anyway"\n>\n  <Button variant="ghost">Navigate away</Button>\n</AlertDialog>'
            }
          >
            <DocsDemoRow>
              <AlertDialog
                title="Leave page?"
                description="You have unsaved changes that will be lost."
                cancelLabel="Stay"
                confirmLabel="Leave anyway"
                onConfirm={() => {}}
              >
                <Button variant="ghost">Navigate away</Button>
              </AlertDialog>
            </DocsDemoRow>
          </DemoCard>
        </DocsDemoGrid>
      </DocsSection>
      <DocsSection>
        <Heading>Usage</Heading>
        <CodeBlock title="AlertDialog Usage" code={usageSnippet} />
      </DocsSection>
      <DocsSection>
        <Heading as="h2">Notes</Heading>
        <DocsList>
          <li>
            AlertDialog is the right component for destructive or irreversible
            actions. For informational modals, use Dialog instead.
          </li>
          <li>
            `title` is required — it doubles as the accessible dialog label for
            screen readers.
          </li>
          <li>
            `danger` styles the confirm button red. Omit it for neutral
            confirmations.
          </li>
          <li>
            Both `onConfirm` and `onCancel` fire before the dialog closes, so you
            can run async logic before the dialog dismisses.
          </li>
        </DocsList>
      </DocsSection>
    </>
  );
}
