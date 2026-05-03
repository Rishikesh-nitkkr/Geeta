"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Brain,
  ChevronDown,
  Download,
  Flame,
  Heart,
  Loader2,
  Mail,
  Menu,
  Moon,
  Pause,
  Phone,
  Play,
  Save,
  Send,
  Share2,
  Shield,
  Sparkles,
  Timer,
  User,
  Volume2,
  VolumeX,
  Wind,
  X
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { chapters, galleryImages, situationMap, wisdomQuotes } from "@/lib/gita-data";
import { getDailyVerse, getNextVerse } from "@/lib/guidance";
import type { GitaVerse, GrowthEntry, GuidanceResponse, SituationKey } from "@/lib/types";

const navItems = [
  { href: "#ask", label: "Ask" },
  { href: "#situations", label: "Situations" },
  { href: "#reader", label: "Gita" },
  { href: "#meditation", label: "Meditation" },
  { href: "#growth", label: "Growth" },
  { href: "#feedback", label: "Feedback" },
  { href: "#contact", label: "Contact" },
  { href: "#profile", label: "Profile" }
];

const moodLabels = ["Heavy", "Low", "Steady", "Light", "Radiant"];

type ProfileForm = {
  name: string;
  email: string;
  preferences: string;
};

const defaultProfile: ProfileForm = {
  name: "",
  email: "",
  preferences: "Calm guidance, slower voice, OM ambience."
};

function readStoredArray<T>(key: string): T[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T[]) : [];
  } catch {
    return [];
  }
}

function readStoredProfile(): ProfileForm {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  try {
    const saved = window.localStorage.getItem("krishna-ai-profile");
    return saved ? { ...defaultProfile, ...(JSON.parse(saved) as Partial<ProfileForm>) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function useRevealAnimations(refreshKey: unknown) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.16 }
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 6, 5) * 0.1}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [refreshKey]);
}

function useSacredAudio({
  omEnabled,
  fluteEnabled,
  omVolume,
  fluteVolume
}: {
  omEnabled: boolean;
  fluteEnabled: boolean;
  omVolume: number;
  fluteVolume: number;
}) {
  const audioRef = useRef<{
    context: AudioContext;
    omGain: GainNode;
    fluteGain: GainNode;
    nodes: AudioNode[];
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return undefined;
    }
    const context = new AudioContextClass();
    const omGain = context.createGain();
    const fluteGain = context.createGain();
    const omOsc = context.createOscillator();
    const omLow = context.createOscillator();
    const fluteOsc = context.createOscillator();
    const fluteLfo = context.createOscillator();
    const fluteLfoGain = context.createGain();

    omOsc.type = "sine";
    omOsc.frequency.value = 136.1;
    omLow.type = "sine";
    omLow.frequency.value = 68.05;
    fluteOsc.type = "triangle";
    fluteOsc.frequency.value = 523.25;
    fluteLfo.frequency.value = 0.18;
    fluteLfoGain.gain.value = 18;
    omGain.gain.value = 0;
    fluteGain.gain.value = 0;

    fluteLfo.connect(fluteLfoGain);
    fluteLfoGain.connect(fluteOsc.frequency);
    omOsc.connect(omGain);
    omLow.connect(omGain);
    fluteOsc.connect(fluteGain);
    omGain.connect(context.destination);
    fluteGain.connect(context.destination);
    omOsc.start();
    omLow.start();
    fluteOsc.start();
    fluteLfo.start();

    audioRef.current = {
      context,
      omGain,
      fluteGain,
      nodes: [omOsc, omLow, fluteOsc, fluteLfo]
    };

    return () => {
      audioRef.current = null;
      void context.close();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const now = audio.context.currentTime;
    const nextOmVolume = omEnabled ? Math.max(0, Math.min(omVolume, 1)) : 0;
    const nextFluteVolume = fluteEnabled ? Math.max(0, Math.min(fluteVolume, 1)) : 0;

    if (omEnabled || fluteEnabled) {
      void audio.context.resume().catch(() => undefined);
    }

    audio.omGain.gain.cancelScheduledValues(now);
    audio.fluteGain.gain.cancelScheduledValues(now);
    audio.omGain.gain.linearRampToValueAtTime(nextOmVolume * 0.18, now + 0.4);
    audio.fluteGain.gain.linearRampToValueAtTime(nextFluteVolume * 0.12, now + 0.4);
  }, [fluteEnabled, fluteVolume, omEnabled, omVolume]);
}

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-antique/80">{eyebrow}</p>
      <h2 className="gold-text text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">{copy}</p>
    </div>
  );
}

function ChakraMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`chakra-spin relative grid shrink-0 place-items-center rounded-full border border-antique/50 bg-antique/10 shadow-divine ${
        compact ? "h-12 w-12" : "h-16 w-16"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-1 rounded-full border border-dashed border-antique/70" />
      <div className="absolute h-[2px] w-[78%] bg-antique/80" />
      <div className="absolute h-[78%] w-[2px] bg-antique/80" />
      <div className="absolute h-[2px] w-[78%] rotate-45 bg-antique/60" />
      <div className="absolute h-[2px] w-[78%] -rotate-45 bg-antique/60" />
      <div className="h-3 w-3 rounded-full bg-antique shadow-[0_0_18px_rgba(246,208,122,0.8)]" />
    </div>
  );
}

function DivineButton({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "primary",
  className = "",
  ariaLabel,
  testId
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "soft";
  className?: string;
  ariaLabel?: string;
  testId?: string;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-antique/70 focus:ring-offset-2 focus:ring-offset-night disabled:opacity-55";
  const variants = {
    primary: "bg-antique text-night shadow-divine hover:-translate-y-0.5 hover:bg-[#ffe2a0]",
    ghost: "border border-white/14 bg-white/[0.05] text-white hover:border-antique/50 hover:bg-white/[0.1]",
    soft: "border border-antique/20 bg-antique/10 text-antique hover:bg-antique/16"
  };

  return (
    <button aria-label={ariaLabel} className={`${base} ${variants[variant]} ${className}`} data-testid={testId} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function AudioController({
  title,
  description,
  enabled,
  volume,
  icon,
  onToggle,
  onVolumeChange,
  testId
}: {
  title: string;
  description: string;
  enabled: boolean;
  volume: number;
  icon: ReactNode;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  testId: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_14px_38px_rgba(0,0,0,0.18)]" data-testid={testId}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-antique/18 bg-antique/10 text-antique">{icon}</div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-white/58">{description}</p>
          </div>
        </div>
        <DivineButton onClick={onToggle} testId={`${testId}-toggle`} variant={enabled ? "primary" : "ghost"}>
          {enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {enabled ? "Pause" : "Play"}
        </DivineButton>
      </div>

      <label className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-night/50 px-3 py-2 text-sm text-white/66">
        <Volume2 className="h-4 w-4 text-antique" />
        <span className="min-w-14">{Math.round(volume * 100)}%</span>
        <input
          aria-label={`${title} volume`}
          className="w-full accent-antique"
          data-testid={`${testId}-volume`}
          max={1}
          min={0}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          step={0.05}
          type="range"
          value={volume}
        />
      </label>
    </div>
  );
}

function AvatarStage({
  response,
  isSpeaking
}: {
  response: GuidanceResponse | null;
  isSpeaking: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [avatarMuted, setAvatarMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.playbackRate = 0.75;
    video.muted = avatarMuted;

    if (isVideoPlaying) {
      void video.play().catch(() => setIsVideoPlaying(false));
    } else {
      video.pause();
    }
  }, [avatarMuted, isVideoPlaying]);

  function toggleVideoPlayback() {
    setIsVideoPlaying((current) => !current);
  }

  return (
    <div className="glass-card krishna-card relative min-h-[460px] overflow-hidden rounded-[1.75rem] p-5" data-reveal>
      <div className="absolute inset-0">
        <img alt="" className="h-full w-full object-cover opacity-28" src="/krishna-bg.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/28 via-night/54 to-night/95" />
      </div>

      <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-antique/75">Speaking Avatar</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Krishna Guidance Presence</h3>
          </div>
          <span className="rounded-full border border-peacock/30 bg-peacock/10 px-3 py-1 text-xs font-semibold text-peacock">
            {isSpeaking ? "Speaking softly" : "Looping presence"}
          </span>
        </div>

        <div className="hero-section relative h-screen w-screen overflow-hidden">
          <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/krishna-bg.jpg" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/60 to-night/80" />
          
          <div className="video-container absolute top-[5%] left-[5%] h-[90%] w-[90%] overflow-hidden rounded-[20px] border border-antique/30 z-10">
            <video
              ref={videoRef}
              aria-label="Looping Krishna avatar video"
              autoPlay
              className="avatar-video"
              data-testid="avatar-video"
              loop
              muted={avatarMuted}
              playsInline
              poster="/assets/user-media/krishna-face-flute.jpg"
              src="/assets/user-media/krishna-avatar.mp4"
            />
            <div className="avatar-eye-reflection pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_32%,rgba(5,2,13,0.28))]" />
          </div>

          <div className="overlay-content absolute bottom-10 left-10 z-20 text-white">
            <div className="flex gap-2">
              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold transition bg-antique text-night hover:bg-antique/80"
                onClick={toggleVideoPlayback}
                type="button"
              >
                {isVideoPlaying ? "Pause Avatar" : "Play Avatar"}
              </button>
              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold transition border border-white/30 text-white hover:border-antique hover:text-antique"
                onClick={() => setAvatarMuted((current) => !current)}
                type="button"
              >
                {avatarMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-night/58 p-4">
          <p className="text-sm leading-6 text-white/74">
            {response
              ? response.krishnaGuidance
              : "Ask a question and this presence will speak the shloka, meaning, and personal guidance with voice and sacred ambience."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResponseCard({
  response,
  isSpeaking,
  onSpeak,
  onPause,
  onShare,
  onCard
}: {
  response: GuidanceResponse | null;
  isSpeaking: boolean;
  onSpeak: () => void;
  onPause: () => void;
  onShare: () => void;
  onCard: () => void;
}) {
  if (!response) {
    return (
      <div className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal>
        <div className="grid min-h-[340px] place-items-center text-center">
          <div>
            <Sparkles className="mx-auto h-10 w-10 text-antique" />
            <h3 className="mt-5 text-2xl font-semibold">Your answer will appear here</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/66">
              Ask with honesty. The system will match your question to Gita wisdom, then prepare voice, sacred video presence, and practical guidance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="glass-card krishna-card rounded-[1.75rem] p-6"
      data-reveal
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-antique/75">Matched Shloka</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Bhagavad Gita {response.verse.chapter}.{response.verse.verse}
          </h3>
        </div>
        <span className="rounded-full border border-peacock/25 bg-peacock/10 px-3 py-1 text-xs font-semibold text-peacock">
          {Math.round(response.confidence * 100)}% relevance
        </span>
      </div>

      <div className="space-y-4">
        <div className={`shloka-speak-panel rounded-2xl border border-antique/18 bg-antique/[0.07] p-4 ${isSpeaking ? "is-speaking" : ""}`}>
          <p className="text-xl font-semibold leading-9 text-antique md:text-2xl">
            {response.verse.sanskrit.split(/\s+/).map((word, index) => (
              <span
                className={`shloka-word ${isSpeaking ? "is-reading" : ""}`}
                key={`${word}-${index}`}
                style={{ animationDelay: `${index * 0.32}s` }}
              >
                {word}
              </span>
            ))}
          </p>
          <p className="mt-3 text-sm italic leading-6 text-white/68">{response.verse.transliteration}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/46">Simple Meaning</p>
            <p className="text-sm leading-7 text-white/78">{response.verse.meaning}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/46">Krishna Guidance for You</p>
            <p className="text-sm leading-7 text-white/82">{response.krishnaGuidance}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-peacock/18 bg-peacock/[0.07] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-peacock/80">Practical Real-Life Advice</p>
          <div className="grid gap-3">
            {response.practicalAdvice.map((item) => (
              <div className="flex gap-3 rounded-xl bg-night/36 p-3 text-sm leading-6 text-white/78" key={item}>
                <Shield className="mt-1 h-4 w-4 shrink-0 text-antique" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <DivineButton onClick={isSpeaking ? onPause : onSpeak}>
            {isSpeaking ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isSpeaking ? "Pause Voice" : "Speak"}
          </DivineButton>
          <DivineButton onClick={onShare} variant="ghost">
            <Share2 className="h-4 w-4" />
            WhatsApp Share
          </DivineButton>
          <DivineButton onClick={onCard} variant="soft">
            <Download className="h-4 w-4" />
            Instagram Card
          </DivineButton>
        </div>
      </div>
    </motion.div>
  );
}

function DailyMessage({ verse, onNext }: { verse: GitaVerse; onNext: () => void }) {
  return (
    <div className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-antique/12 text-antique">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-antique/72">Today&apos;s Divine Message</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Gita {verse.chapter}.{verse.verse}</h3>
        </div>
      </div>
      <p className="mt-5 text-lg font-medium leading-8 text-antique">{verse.quote}</p>
      <p className="mt-3 text-sm leading-6 text-white/66">{verse.meaning}</p>
      <DivineButton className="mt-5" onClick={onNext} variant="ghost">
        <Sparkles className="h-4 w-4" />
        Next Message
      </DivineButton>
    </div>
  );
}

function QuotesCarousel() {
  const repeated = [...wisdomQuotes, ...wisdomQuotes];

  return (
    <section className="overflow-hidden py-12" id="wisdom">
      <SectionHeading
        copy="A moving line of concise Gita-inspired reflections for quick spiritual grounding."
        eyebrow="Krishna Wisdom"
        title="Quotes That Keep The Heart Awake"
      />
      <div className="relative overflow-hidden">
        <div className="quote-track flex w-max gap-4 px-4">
          {repeated.map((quote, index) => (
            <div className="glass-card krishna-card w-[320px] rounded-2xl p-5 sm:w-[420px]" data-reveal key={`${quote.id}-${index}`}>
              <Sparkles className="mb-5 h-5 w-5 text-antique" />
              <p className="text-base leading-7 text-white/82">{quote.text}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-antique/66">{quote.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitaReader() {
  const [activeChapter, setActiveChapter] = useState(2);
  const [openVerse, setOpenVerse] = useState<string | null>("2-47");
  const [bookmarks, setBookmarks] = useState<string[]>(() => readStoredArray<string>("krishna-ai-bookmarks"));

  function toggleBookmark(id: string) {
    setBookmarks((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem("krishna-ai-bookmarks", JSON.stringify(next));
      return next;
    });
  }

  const chapter = chapters.find((item) => item.number === activeChapter) ?? chapters[1];

  return (
    <section className="px-4 py-16" id="reader">
      <SectionHeading
        copy="Chapter navigation, expandable verses, transliteration, meanings, and bookmarks for returning to the verses that speak to you."
        eyebrow="Full Gita Reading"
        title="Chapter-Wise Sacred Reader"
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <div className="glass-card krishna-card rounded-[1.75rem] p-4" data-reveal>
          <div className="max-h-[640px] space-y-2 overflow-auto pr-1">
            {chapters.map((item) => (
              <button
                className={`w-full rounded-lg px-4 py-3 text-left transition ${
                  item.number === activeChapter ? "bg-antique text-night" : "bg-white/[0.045] text-white/72 hover:bg-white/[0.09]"
                }`}
                key={item.number}
                onClick={() => {
                  setActiveChapter(item.number);
                  setOpenVerse(item.verses[0]?.id ?? null);
                }}
                type="button"
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.18em]">Chapter {item.number}</span>
                <span className="mt-1 block text-sm font-semibold">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card krishna-card rounded-[1.75rem] p-5 md:p-7" data-reveal>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-antique/72">Chapter {chapter.number}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">{chapter.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/66">{chapter.summary}</p>
          </div>

          {chapter.verses.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 text-sm text-white/66">
              This chapter is ready for the complete verse import. Add more verses to <code className="text-antique">lib/gita-data.ts</code> and they will appear here automatically.
            </div>
          ) : (
            <div className="space-y-3">
              {chapter.verses.map((verse) => {
                const isOpen = openVerse === verse.id;
                const isBookmarked = bookmarks.includes(verse.id);

                return (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045]" key={verse.id}>
                    <div className="flex items-center gap-2 p-4">
                      <button
                        className="flex flex-1 items-center justify-between gap-3 text-left"
                        onClick={() => setOpenVerse(isOpen ? null : verse.id)}
                        type="button"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-white">Verse {verse.chapter}.{verse.verse}</span>
                          <span className="mt-1 block text-xs text-white/50">{verse.tags.slice(0, 4).join(" / ")}</span>
                        </span>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-antique transition ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <button
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark verse"}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-night/44 text-antique transition hover:bg-antique/12"
                        onClick={() => toggleBookmark(verse.id)}
                        type="button"
                      >
                        {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <div className="border-t border-white/10 p-4">
                            <p className="text-lg font-semibold leading-8 text-antique">{verse.sanskrit}</p>
                            <p className="mt-3 text-sm italic leading-6 text-white/58">{verse.transliteration}</p>
                            <p className="mt-4 text-sm leading-7 text-white/76">{verse.meaning}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeImage, setActiveImage] = useState<(typeof galleryImages)[number] | null>(null);

  return (
    <section className="px-4 py-16" id="gallery">
      <SectionHeading
        copy="A devotional image grid with hover zoom and lightbox preview for the visual side of the platform."
        eyebrow="Krishna Gallery"
        title="Sacred Visual Atmosphere"
      />

      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <button className="group glass-card krishna-card overflow-hidden rounded-[1.25rem] text-left" data-reveal key={image.id} onClick={() => setActiveImage(image)} type="button">
            <div className="relative h-64 overflow-hidden">
              <img alt={image.title} className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${image.focus}`} src={image.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-lg font-semibold text-white">{image.title}</p>
                <p className="mt-1 text-sm text-white/62">{image.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/82 p-4 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-night"
              initial={{ scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              <button
                aria-label="Close image preview"
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-lg bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
                onClick={() => setActiveImage(null)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <img alt={activeImage.title} className={`max-h-[76vh] w-full object-cover ${activeImage.focus}`} src={activeImage.image} />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-white">{activeImage.title}</h3>
                <p className="mt-2 text-sm text-white/64">{activeImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MeditationModal({
  open,
  onClose,
  onStartAudio
}: {
  open: boolean;
  onClose: () => void;
  onStartAudio: () => void;
}) {
  const [minutes, setMinutes] = useState(5);
  const [remaining, setRemaining] = useState(5 * 60);
  const [running, setRunning] = useState(false);

  function selectMinutes(value: number) {
    const safeValue = Math.max(1, Math.min(60, value || 1));
    setMinutes(safeValue);
    if (!running) {
      setRemaining(safeValue * 60);
    }
  }

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  const formatted = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/86 p-3 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            animate={{ scale: 1, y: 0 }}
            className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-antique/18 bg-night shadow-divine"
            initial={{ scale: 0.96, y: 28 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" src="/assets/user-media/krishna-cosmic-blue.jpg" />
            <div className="absolute inset-0 bg-radial-aura" />
            <button
              aria-label="Close meditation"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-lg border border-white/14 bg-black/42 text-white backdrop-blur"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-antique/72">Meditation Mode</p>
              <h3 className="gold-text text-4xl font-semibold md:text-6xl">Enter The Inner Temple</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                OM ambience begins when you start. Let the breath become slow, the body become still, and the mind return gently.
              </p>

              <div className="relative my-8 grid h-72 w-72 place-items-center">
                <div className="breathing absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(246,208,122,0.35),transparent_65%)]" />
                <div className="mandala-ring absolute inset-2 rounded-full border border-dashed border-antique/40" />
                <div className="mandala-ring-reverse absolute inset-12 rounded-full border border-peacock/28" />
                <div className="grid h-40 w-40 place-items-center rounded-full border border-antique/40 bg-night/70 shadow-divine">
                  <span className="text-5xl font-semibold text-antique">ॐ</span>
                </div>
              </div>

              <div className="text-6xl font-semibold tabular-nums text-white md:text-7xl">{formatted}</div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[1, 5, 10].map((value) => (
                  <button
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${minutes === value ? "bg-antique text-night" : "border border-white/14 bg-white/[0.06] text-white"}`}
                    key={value}
                    onClick={() => selectMinutes(value)}
                    type="button"
                  >
                    {value} min
                  </button>
                ))}
                <label className="flex items-center gap-2 rounded-lg border border-white/14 bg-white/[0.06] px-3 py-2 text-sm text-white/72">
                  Custom
                  <input
                    className="w-16 rounded-md border border-white/10 bg-night/70 px-2 py-1 text-white outline-none focus:border-antique"
                    max={60}
                    min={1}
                    onChange={(event) => selectMinutes(Number(event.target.value))}
                    type="number"
                    value={minutes}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <DivineButton
                  onClick={() => {
                    onStartAudio();
                    setRunning((current) => !current);
                  }}
                >
                  {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {running ? "Pause Meditation" : "Start Meditation"}
                </DivineButton>
                <DivineButton
                  onClick={() => {
                    setRunning(false);
                    setRemaining(minutes * 60);
                  }}
                  variant="ghost"
                >
                  Reset Timer
                </DivineButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GrowthSystem() {
  const [entries, setEntries] = useState<GrowthEntry[]>(() => readStoredArray<GrowthEntry>("krishna-ai-growth"));
  const [moodBefore, setMoodBefore] = useState(3);
  const [moodAfter, setMoodAfter] = useState(4);
  const [minutes, setMinutes] = useState(5);
  const [reflection, setReflection] = useState("");
  const [lesson, setLesson] = useState("");
  const [now] = useState(() => Date.now());

  function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const entry: GrowthEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      moodBefore,
      moodAfter,
      meditationMinutes: minutes,
      reflection: reflection.trim(),
      lesson: lesson.trim()
    };
    const next = [entry, ...entries].slice(0, 28);
    setEntries(next);
    window.localStorage.setItem("krishna-ai-growth", JSON.stringify(next));
    setReflection("");
    setLesson("");
  }

  const weekly = useMemo(() => {
    const since = now - 7 * 24 * 60 * 60 * 1000;
    const week = entries.filter((entry) => new Date(entry.date).getTime() >= since);
    const meditation = week.reduce((total, entry) => total + entry.meditationMinutes, 0);
    const uplift = week.reduce((total, entry) => total + (entry.moodAfter - entry.moodBefore), 0);
    return { count: week.length, meditation, uplift };
  }, [entries, now]);

  return (
    <section className="px-4 py-16" id="growth">
      <SectionHeading
        copy="Track reflection, mood shifts, meditation time, and lessons learned so guidance becomes lived transformation."
        eyebrow="Personal Growth"
        title="Weekly Dharma Dashboard"
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal onSubmit={saveEntry}>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Mood Before</span>
              <input className="mt-4 w-full accent-antique" max={5} min={1} onChange={(event) => setMoodBefore(Number(event.target.value))} type="range" value={moodBefore} />
              <span className="mt-2 block text-sm text-antique">{moodLabels[moodBefore - 1]}</span>
            </label>
            <label className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Mood After</span>
              <input className="mt-4 w-full accent-antique" max={5} min={1} onChange={(event) => setMoodAfter(Number(event.target.value))} type="range" value={moodAfter} />
              <span className="mt-2 block text-sm text-antique">{moodLabels[moodAfter - 1]}</span>
            </label>
            <label className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Meditation</span>
              <input className="mt-4 w-full rounded-lg border border-white/10 bg-night/62 px-3 py-2 text-white outline-none focus:border-antique" min={0} onChange={(event) => setMinutes(Number(event.target.value))} type="number" value={minutes} />
              <span className="mt-2 block text-sm text-antique">minutes</span>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Daily Reflection</span>
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-white/10 bg-night/62 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/36 focus:border-antique"
              onChange={(event) => setReflection(event.target.value)}
              placeholder="What did I feel today, and where did I need guidance?"
              required
              value={reflection}
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Lesson Learned</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-night/62 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/36 focus:border-antique"
              onChange={(event) => setLesson(event.target.value)}
              placeholder="One lesson Krishna helped me see..."
              required
              value={lesson}
            />
          </label>

          <DivineButton className="mt-5" type="submit">
            <Heart className="h-4 w-4" />
            Save Reflection
          </DivineButton>
        </form>

        <div className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/44">Entries</p>
              <p className="mt-2 text-3xl font-semibold text-antique">{weekly.count}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/44">Meditation</p>
              <p className="mt-2 text-3xl font-semibold text-antique">{weekly.meditation}m</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/44">Mood Lift</p>
              <p className="mt-2 text-3xl font-semibold text-antique">+{weekly.uplift}</p>
            </div>
          </div>

          <div className="mt-5 max-h-[380px] space-y-3 overflow-auto pr-1">
            {entries.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-sm leading-6 text-white/62">
                No reflections yet. Save your first entry after guidance or meditation.
              </div>
            ) : (
              entries.map((entry) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={entry.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{new Date(entry.date).toLocaleDateString()}</p>
                    <p className="text-xs text-antique">
                      Mood {entry.moodBefore} to {entry.moodAfter} / {entry.meditationMinutes}m
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/68">{entry.lesson}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedbackSection() {
  const [success, setSuccess] = useState(false);

  function handleFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSuccess(true);
  }

  return (
    <section className="relative z-10 px-4 py-16" id="feedback">
      <SectionHeading
        copy="Share what felt helpful, what felt unclear, or what would make the guidance more useful for daily life."
        eyebrow="Feedback"
        title="Help Geeta AI Become More Useful"
      />
      <form className="glass-card krishna-card mx-auto max-w-3xl rounded-[1.75rem] p-6" data-reveal data-testid="feedback-form" onSubmit={handleFeedback}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-night/62 p-4 text-sm text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
              maxLength={80}
              name="name"
              placeholder="Your name"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Email</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-night/62 p-4 text-sm text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
              maxLength={120}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Message</span>
          <textarea
            className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-night/62 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
            maxLength={900}
            name="message"
            placeholder="Tell us what should feel calmer, clearer, or more personal."
            required
          />
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <DivineButton type="submit">
            <Send className="h-4 w-4" />
            Submit Feedback
          </DivineButton>
          {success && (
            <p className="rounded-full border border-peacock/25 bg-peacock/10 px-4 py-2 text-sm font-semibold text-peacock" role="status">
              Feedback received. Thank you.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative z-10 px-4 py-16" id="contact">
      <SectionHeading
        copy="Use these details for project review, support notes, and collaboration conversations."
        eyebrow="Contact Us"
        title="A Clear Way To Reach The Team"
      />
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <a className="glass-card krishna-card rounded-[1.5rem] p-5" data-reveal href="mailto:hello@krishnaai.app">
          <Mail className="mb-5 h-6 w-6 text-antique" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Email</p>
          <p className="mt-2 break-words text-lg font-semibold text-white">hello@krishnaai.app</p>
        </a>
        <div className="glass-card krishna-card rounded-[1.5rem] p-5" data-reveal>
          <Phone className="mb-5 h-6 w-6 text-antique" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Phone</p>
          <p className="mt-2 text-lg font-semibold text-white">+91 98765 43210</p>
        </div>
        <div className="glass-card krishna-card rounded-[1.5rem] p-5" data-reveal>
          <Share2 className="mb-5 h-6 w-6 text-antique" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Social</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white/72 hover:border-antique/45 hover:text-antique" href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank">
              Instagram
            </a>
            <a className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white/72 hover:border-antique/45 hover:text-antique" href="https://www.youtube.com/" rel="noopener noreferrer" target="_blank">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  const [profile, setProfile] = useState<ProfileForm>(() => readStoredProfile());
  const [saved, setSaved] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("krishna-ai-profile", JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <section className="relative z-10 px-4 py-16" id="profile">
      <SectionHeading
        copy="Keep simple local preferences so the experience can feel more personal during demos and continued use."
        eyebrow="Profile"
        title="Your Guidance Preferences"
      />
      <form className="glass-card krishna-card mx-auto max-w-4xl rounded-[1.75rem] p-6" data-reveal data-testid="profile-form" onSubmit={saveProfile}>
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-antique/20 bg-antique/10 text-antique">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Personal Profile</h3>
            <p className="mt-1 text-sm text-white/58">Saved locally in this browser.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-night/62 p-4 text-sm text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
              maxLength={80}
              onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              value={profile.name}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Email</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-night/62 p-4 text-sm text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
              maxLength={120}
              onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
              type="email"
              value={profile.email}
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">Preferences</span>
          <textarea
            className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-night/62 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
            maxLength={700}
            onChange={(event) => setProfile((current) => ({ ...current, preferences: event.target.value }))}
            placeholder="Voice, ambience, guidance tone, meditation style..."
            value={profile.preferences}
          />
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <DivineButton type="submit">
            <Save className="h-4 w-4" />
            Save Profile
          </DivineButton>
          {saved && (
            <p className="rounded-full border border-antique/20 bg-antique/10 px-4 py-2 text-sm font-semibold text-antique" role="status">
              Profile saved.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default function GeetaAiApp() {
  const [query, setQuery] = useState("");
  const [selectedSituation, setSelectedSituation] = useState<SituationKey | "">("");
  const [response, setResponse] = useState<GuidanceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [omEnabled, setOmEnabled] = useState(true);
  const [fluteEnabled, setFluteEnabled] = useState(false);
  const [omVolume, setOmVolume] = useState(0.34);
  const [fluteVolume, setFluteVolume] = useState(0.22);
  const [dailyVerse, setDailyVerse] = useState<GitaVerse>(() => getDailyVerse());
  const [meditationOpen, setMeditationOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useSacredAudio({ fluteEnabled, fluteVolume, omEnabled, omVolume });
  useRevealAnimations(response?.verse.id ?? "initial");

  async function handleAsk(event?: FormEvent<HTMLFormElement>, situationOverride?: SituationKey) {
    event?.preventDefault();
    const activeQuery = situationOverride ? `I need guidance for ${situationMap[situationOverride].label.toLowerCase()}. ${situationMap[situationOverride].mantra}` : query;

    if (activeQuery.trim().length < 6) {
      setError("Please write a little more so the guidance can be meaningful.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const guidanceResponse = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: activeQuery, situation: situationOverride || selectedSituation || undefined })
      });

      if (!guidanceResponse.ok) {
        const data = (await guidanceResponse.json()) as { error?: string };
        throw new Error(data.error || "Guidance could not be generated.");
      }

      const data = (await guidanceResponse.json()) as GuidanceResponse;
      setResponse(data);
      setQuery(situationOverride ? activeQuery : query);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function playGuidance() {
    if (!response) {
      return;
    }

    setOmEnabled(true);
    setIsSpeaking(true);
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();

    try {
      const ttsResponse = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: response.audioScript })
      });

      const contentType = ttsResponse.headers.get("Content-Type") || "";
      if (ttsResponse.ok && contentType.includes("audio")) {
        const blob = await ttsResponse.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = 0.9;
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };
        audio.onerror = () => setIsSpeaking(false);
        audioRef.current = audio;
        await audio.play();
        return;
      }
    } catch {
      // Browser speech fallback below keeps the product usable without paid keys.
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(response.audioScript);
      utterance.rate = 0.78;
      utterance.pitch = 0.72;
      utterance.volume = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
      setError("Voice playback is not supported in this browser.");
    }
  }

  function pauseGuidance() {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }

  function shareWhatsApp() {
    const verse = response?.verse ?? dailyVerse;
    const text = `Krishna message for today: ${verse.quote} - Bhagavad Gita ${verse.chapter}.${verse.verse}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function downloadShareCard() {
    const verse = response?.verse ?? dailyVerse;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#05020d");
    gradient.addColorStop(0.45, "#25104b");
    gradient.addColorStop(1, "#0a0614");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.fillStyle = "rgba(246, 208, 122, 0.18)";
    ctx.beginPath();
    ctx.arc(820, 260, 260, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 208, 122, 0.45)";
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, 940, 1210);
    ctx.fillStyle = "#f6d07a";
    ctx.font = "700 52px Segoe UI, sans-serif";
    ctx.fillText("GEETA AI", 110, 170);
    ctx.font = "700 42px Segoe UI, sans-serif";
    ctx.fillText(`Bhagavad Gita ${verse.chapter}.${verse.verse}`, 110, 270);
    ctx.fillStyle = "#fff7df";
    ctx.font = "600 48px Segoe UI, sans-serif";

    const words = verse.quote.split(" ");
    let line = "";
    let y = 430;
    words.forEach((word) => {
      const test = `${line}${word} `;
      if (ctx.measureText(test).width > 810) {
        ctx.fillText(line.trim(), 110, y);
        line = `${word} `;
        y += 66;
      } else {
        line = test;
      }
    });
    ctx.fillText(line.trim(), 110, y);

    ctx.fillStyle = "rgba(255, 247, 223, 0.72)";
    ctx.font = "400 32px Segoe UI, sans-serif";
    ctx.fillText("A daily divine reflection for courage, calm, and dharma.", 110, 1170);

    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "krishna-ai-message.png";
    anchor.click();
  }

  const situationEntries = Object.entries(situationMap) as Array<[SituationKey, (typeof situationMap)[SituationKey]]>;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img alt="" className="h-full w-full scale-105 object-cover opacity-100" src="/krishna-bg.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/60 to-night/80" />
        <div className="float-light absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-antique/18 blur-3xl" />
        <div className="float-light absolute right-[12%] top-[22%] h-36 w-36 rounded-full bg-lotus/20 blur-3xl [animation-delay:1.4s]" />
        <div className="float-light absolute bottom-[18%] left-[18%] h-32 w-32 rounded-full bg-peacock/16 blur-3xl [animation-delay:2.4s]" />
      </div>
      <div className="sacred-particle-layer" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            className="sacred-particle"
            key={index}
            style={{
              animationDelay: `${index * 0.72}s`,
              left: `${7 + ((index * 17) % 88)}%`,
              top: `${18 + ((index * 23) % 74)}%`
            }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-night/58 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 pr-20 lg:pr-4">
          <a className="flex min-w-0 items-center gap-3" href="#top">
            <ChakraMark compact />
            <span>
              <span className="block text-base font-semibold tracking-[0.18em] text-white">GEETA AI</span>
              <span className="hidden text-xs uppercase tracking-[0.26em] text-antique/64 sm:block">Divine Life Guidance</span>
            </span>
          </a>

          <nav className="hidden items-center justify-end gap-1 lg:flex xl:gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a className="rounded-lg px-3 py-2 text-sm font-medium text-white/66 transition hover:bg-white/[0.07] hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Toggle navigation"
            className="mobile-nav-toggle absolute right-4 top-4 z-50 grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-antique/35 bg-antique/10 text-antique shadow-divine backdrop-blur lg:hidden"
            onClick={() => setMobileNavOpen((current) => !current)}
            type="button"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="grid gap-2 px-4 py-3">
                {navItems.map((item) => (
                  <a
                    className="rounded-lg bg-white/[0.05] px-3 py-3 text-sm font-medium text-white/74"
                    href={item.href}
                    key={item.href}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="relative z-10 px-4 pb-12 pt-10 md:pb-20 md:pt-16" id="top">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="hero-arrival min-w-0">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-antique/20 bg-antique/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-antique sm:tracking-[0.2em]">
              <Sparkles className="h-4 w-4" />
              <span className="sm:hidden">Voice and Gita wisdom</span>
              <span className="hidden sm:inline">Voice, avatar, meditation, and Gita wisdom</span>
            </div>
            <h1 className="gold-text max-w-5xl text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-8xl">GEETA AI</h1>
            <p className="mt-5 max-w-[21rem] break-words text-base leading-8 text-white/72 sm:max-w-2xl sm:text-lg md:text-xl">
              Ask a life question and receive a relevant shloka, transliteration, meaning, personal guidance, practical advice, sacred voice playback, and immersive meditation support.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["24", "Gita insights"],
                ["5", "Situation paths"],
                ["∞", "Inner returns"]
              ].map(([value, label]) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={label}>
                  <p className="text-3xl font-semibold text-antique">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/48">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <DailyMessage verse={dailyVerse} onNext={() => setDailyVerse((current) => getNextVerse(current.id))} />
        </div>
      </section>

      <section className="relative z-10 px-4 py-12" id="ask">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_0.92fr]">
          <div className="space-y-6">
            <form className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal onSubmit={handleAsk}>
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-lotus/14 text-aura">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-antique/72">Ask Krishna Anything</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Share what is heavy in your heart</h2>
                </div>
              </div>

              <textarea
                className="min-h-40 w-full resize-y rounded-2xl border border-white/12 bg-night/68 p-4 text-base leading-7 text-white outline-none transition placeholder:text-white/36 focus:border-antique focus:ring-4 focus:ring-antique/10"
                maxLength={1200}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Example: Krishna, I am afraid of failing my career and I keep overthinking every decision..."
                value={query}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {situationEntries.map(([key, situation]) => (
                  <button
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedSituation === key ? "border-antique bg-antique text-night" : "border-white/12 bg-white/[0.05] text-white/70 hover:border-antique/50"
                    }`}
                    key={key}
                    onClick={() => setSelectedSituation(key)}
                    type="button"
                  >
                    {situation.label}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100" role="alert">
                  {error}
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <DivineButton disabled={loading} type="submit">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Finding Shloka..." : "Receive Guidance"}
                </DivineButton>
                <DivineButton onClick={() => setMeditationOpen(true)} variant="ghost">
                  <Moon className="h-4 w-4" />
                  Start Meditation
                </DivineButton>
              </div>
            </form>

            <div className="glass-card krishna-card rounded-[1.75rem] p-5" data-reveal>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-antique/70">Sacred Audio</p>
                <p className="mt-1 text-sm text-white/62">OM and flute are now separate, so the atmosphere can stay meditative without becoming crowded.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AudioController
                  description="Default ambience for meditation and guidance."
                  enabled={omEnabled}
                  icon={<Volume2 className="h-5 w-5" />}
                  onToggle={() => setOmEnabled((current) => !current)}
                  onVolumeChange={setOmVolume}
                  testId="om-audio-controller"
                  title="OM Chant"
                  volume={omVolume}
                />
                <AudioController
                  description="Optional music layer when you want a softer devotional mood."
                  enabled={fluteEnabled}
                  icon={<Wind className="h-5 w-5" />}
                  onToggle={() => setFluteEnabled((current) => !current)}
                  onVolumeChange={setFluteVolume}
                  testId="flute-audio-controller"
                  title="Flute Music"
                  volume={fluteVolume}
                />
              </div>
            </div>

            <ResponseCard
              isSpeaking={isSpeaking}
              onCard={downloadShareCard}
              onPause={pauseGuidance}
              onShare={shareWhatsApp}
              onSpeak={playGuidance}
              response={response}
            />
          </div>

          <AvatarStage isSpeaking={isSpeaking} response={response} />
        </div>
      </section>

      <section className="relative z-10 px-4 py-16" id="situations">
        <SectionHeading
          copy="Choose a situation and the app instantly asks the guidance engine with the right context."
          eyebrow="Find Guidance By Situation"
          title="Life Problems, Met With Dharma"
        />
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {situationEntries.map(([key, situation]) => (
            <button
              className="glass-card krishna-card group rounded-[1.25rem] p-5 text-left transition hover:-translate-y-1 hover:border-antique/45"
              data-reveal
              key={key}
              onClick={() => {
                setSelectedSituation(key);
                void handleAsk(undefined, key);
                document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-antique/12 text-antique transition group-hover:bg-antique group-hover:text-night">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">{situation.label}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{situation.mantra}</p>
            </button>
          ))}
        </div>
      </section>

      <QuotesCarousel />
      <GitaReader />

      <section className="relative z-10 px-4 py-16" id="meditation">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="glass-card krishna-card rounded-[1.75rem] p-6" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-antique/72">Immersive Practice</p>
            <h2 className="gold-text mt-3 text-4xl font-semibold md:text-5xl">Meditation Mode</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Open a focused 80% immersive space with a glowing mandala, OM ambience, optional flute controls, and timer presets for one, five, ten, or custom minutes.
            </p>
            <DivineButton className="mt-6" onClick={() => setMeditationOpen(true)}>
              <Timer className="h-4 w-4" />
              Start Meditation
            </DivineButton>
          </div>
          <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-[1.75rem] border border-antique/18 bg-night/72">
            <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-28" src="/assets/user-media/krishna-cosmic-blue.jpg" />
            <div className="mandala-ring absolute h-72 w-72 rounded-full border border-dashed border-antique/36" />
            <div className="mandala-ring-reverse absolute h-48 w-48 rounded-full border border-peacock/30" />
            <div className="breathing relative grid h-36 w-36 place-items-center rounded-full bg-antique/10 text-6xl text-antique shadow-divine">ॐ</div>
          </div>
        </div>
      </section>

      <Gallery />
      <GrowthSystem />
      <FeedbackSection />
      <ContactSection />
      <ProfileSection />

      <footer className="relative z-10 border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/54 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ChakraMark compact />
            <span>GEETA AI - Divine Life Guidance System</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="hover:text-antique" href="#ask">
              Ask
            </a>
            <a className="hover:text-antique" href="#reader">
              Gita Reader
            </a>
            <a className="hover:text-antique" href="#growth">
              Growth
            </a>
            <a className="hover:text-antique" href="#feedback">
              Feedback
            </a>
            <a className="hover:text-antique" href="#contact">
              Contact
            </a>
            <a className="hover:text-antique" href="#profile">
              Profile
            </a>
          </div>
        </div>
      </footer>

      <MeditationModal
        onClose={() => setMeditationOpen(false)}
        onStartAudio={() => {
          setOmEnabled(true);
          setFluteEnabled(false);
        }}
        open={meditationOpen}
      />
    </main>
  );
}
