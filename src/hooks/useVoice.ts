import { useState, useCallback, useRef, useEffect } from 'react';

export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthesisRef.current = window.speechSynthesis;
    
    // Initialize speech recognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'id-ID';
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthesisRef.current) return;
    
    synthesisRef.current.cancel(); // Stop any current speech
    
    // Clean text by removing markdown formatting before reading
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher pitch for friendly tone
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    
    synthesisRef.current.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const listen = useCallback((onResult: (text: string) => void, onError: (err: string) => void) => {
    if (!recognitionRef.current) {
      onError('Maaf, browser Anda tidak mendukung fitur mikrofon untuk saat ini.');
      return;
    }

    try {
      setIsListening(true);
      recognitionRef.current.start();
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        onError('Terjadi masalah dengan mikrofon. Silakan coba mengetik pesan Anda.');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } catch (e) {
      setIsListening(false);
      onError('Mikrofon sedang digunakan atau diblokir.');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return {
    speak,
    stopSpeaking,
    listen,
    stopListening,
    isSpeaking,
    isListening,
    hasSpeechRecognition: !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition
  };
}
