import type { LabType } from "@/types/learning";
import { AttentionLab } from "./attention-lab";
import { ClassifierLab } from "./classifier-lab";
import { NetworkLab } from "./network-lab";
import { NeuronLab } from "./neuron-lab";
import { TemperatureLab } from "./temperature-lab";
import { TokenizerLab } from "./tokenizer-lab";

export function InteractiveLab({ type }: { type: LabType }) {
  if (type === "neuron") return <NeuronLab />;
  if (type === "network") return <NetworkLab />;
  if (type === "classifier") return <ClassifierLab />;
  if (type === "tokenizer") return <TokenizerLab />;
  if (type === "attention") return <AttentionLab />;
  return <TemperatureLab />;
}
