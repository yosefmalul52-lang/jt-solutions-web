import StudioServiceTemplate, {
  type ServiceDeliverableItem,
  type ServiceFaqItem,
  type StudioServiceTemplateProps,
} from "@/components/templates/StudioServiceTemplate";

export type { ServiceDeliverableItem, ServiceFaqItem };

export type ServiceTemplateProps = Omit<
  StudioServiceTemplateProps,
  "sections" | "processSteps"
>;

export default function ServiceTemplate(props: ServiceTemplateProps) {
  return <StudioServiceTemplate {...props} />;
}
