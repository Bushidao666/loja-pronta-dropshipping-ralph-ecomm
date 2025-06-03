import React from 'react';
import useFunnelState from '@/hooks/useFunnelState';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Rocket, LockKeyhole, LucideIcon } from 'lucide-react';

interface StepNavigationProps {
  onNext?: () => void; // Custom logic before or after navigating
  onPrevious?: () => void;
  nextButtonLabel?: string; // Nova prop para o texto do botão de avançar
  nextButtonIcon?: LucideIcon; // Nova prop para o ícone do botão de avançar
  customButtonClass?: string; // Prop for custom button classes
  // can also pass custom labels or conditional rendering logic if needed
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onNext,
  onPrevious,
  nextButtonLabel,
  nextButtonIcon: NextIconComponent,
  customButtonClass
}) => {
  const {
    currentStep,
    totalSteps,
    nextStep: storeNextStep,
    previousStep: storePreviousStep,
  } = useFunnelState();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      storeNextStep();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      storePreviousStep();
    }
  };

  // Determina o texto e o ícone do botão de avançar/finalizar
  let finalNextButtonLabel = "Avançar";
  let FinalNextIcon: LucideIcon = ArrowRight;

  if (currentStep < totalSteps) {
    if (nextButtonLabel) finalNextButtonLabel = nextButtonLabel;
    if (NextIconComponent) FinalNextIcon = NextIconComponent;
  } else { // Última etapa antes do "fim" do funil de etapas (checkout é depois)
    finalNextButtonLabel = nextButtonLabel || "Ver Minha Oferta!"; // Fallback se não fornecido na última etapa
    FinalNextIcon = NextIconComponent || Rocket;
  }

  const defaultButtonClasses = currentStep < totalSteps 
    ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600' 
    : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600';

  return (
    <div className="w-full flex items-center justify-between gap-2 p-2" style={{ justifyContent: currentStep > 1 ? 'space-between' : 'flex-end' }}>
      {currentStep > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          className="text-sm px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
      )}
      <Button
        size="sm"
        onClick={handleNext}
        className={`${customButtonClass || defaultButtonClasses} text-white font-semibold shadow-sm hover:shadow-md transition-shadow text-sm px-4 py-2 break-words hyphens-auto leading-tight max-w-full`}
      >
        <span className="truncate">{finalNextButtonLabel}</span>
        <FinalNextIcon className="ml-1 h-4 w-4 flex-shrink-0" />
      </Button>
    </div>
  );
};

export default StepNavigation; 