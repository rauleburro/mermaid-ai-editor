import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Presets } from "@/components/Presets";
import { CodeEditor } from "@/components/CodeEditor";
import { PromptInput } from "@/components/PromptInput";
import { MermaidVisualizer } from "@/components/MermaidVisualizer";

const Home = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={30} className="flex-1 flex flex-col">
          <div className="p-2">
            <PromptInput />
          </div>
          <div className="flex-1 p-2">
            <CodeEditor />
          </div>
          <div className="p-2 border-t">
            <Presets />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70}>
          <div className="flex items-stretch justify-stretch h-full">
            <MermaidVisualizer />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;
