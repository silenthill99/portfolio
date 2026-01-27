# Changelog - Portfolio

## 2026-01-27 - Refonte visuelle

### Palette de couleurs
- Fond principal : `slate-900` (gris-bleu foncé)
- Fond secondaire : `slate-800/50`
- Texte principal : `white`
- Texte secondaire : `slate-300`, `slate-400`
- Accents : `blue-400`, `blue-500`
- Blobs décoratifs : `blue-500/10`, `purple-500/10`, `indigo-500/10`

### Composants créés

#### `components/project-card.tsx`
- Card pour afficher les projets sur la page d'accueil
- Fond `slate-800/80` avec bordure `slate-700/50`
- Image avec overlay gradient au survol
- Animation fade-in-up avec délai progressif
- Lien "Voir le projet" avec icône flèche
- Blob décoratif au hover

#### `components/glass-timeline.tsx`
- Timeline verticale pour les expériences professionnelles
- Cards alternées gauche/droite sur desktop
- Points de timeline avec icône Building et glow subtil
- Ligne de connexion avec gradient
- Badges de compétences en `blue-500/10`
- Animation fade-in-up

#### `components/scroll-navbar.tsx`
- Menu de navigation discret
- Apparaît après 100px de scroll
- Centré en haut avec fond `slate-900/90` et backdrop-blur
- 3 liens : Accueil, Projets, Expériences
- Indicateur de section active en bleu
- Icônes : Home, FolderOpen, Briefcase

### Pages modifiées

#### `pages/welcome.tsx`
- Fond `slate-900`
- Import du `ScrollNavbar`
- IDs ajoutés aux sections pour la navigation (`hero`, `projects`, `experience`)
- Section projets avec blobs décoratifs bleu/violet
- Section expériences avec blob indigo central
- Textes descriptifs sous les titres de section

#### `pages/articles/show.tsx`
- Refonte complète du design
- Fond `slate-900` avec blobs décoratifs fixes
- Bouton retour avec icône `ArrowLeft`
- Layout 2 colonnes : carousel + contenu
- Carousel avec bordures `slate-700/50` et boutons stylisés
- Card "Objectif" avec icône `Target`
- Boutons "Voir le projet" (`ExternalLink`) et "Code source" (`Github`)
- Animations fade-in

#### `components/hero-section.tsx`
- Fond dégradé `from-slate-900 to-slate-800`
- Blobs colorés : `blue-500/10` et `purple-500/10`
- Texte en `white`, `slate-200`, `slate-300`

### Animations CSS ajoutées (`css/app.css`)

```css
@keyframes glow-pulse { /* Effet de pulsation lumineuse */ }
@keyframes shimmer { /* Effet de brillance */ }
@keyframes float { /* Effet de flottement */ }
```

Variables d'animation :
- `--animate-glow-pulse`
- `--animate-shimmer`
- `--animate-float`

### Dépendances utilisées
- `lucide-react` : Icônes (ArrowRight, ArrowLeft, ExternalLink, Github, Target, Home, FolderOpen, Briefcase, Building2, Calendar)
- `@/components/ui/carousel` : Carousel d'images (Embla)

---

## 2026-01-27 - Corrections mineures

### `components/glass-timeline.tsx`
- Réorganisation des classes Tailwind (ordre logique)
- Affichage des compétences dans un badge unique (au lieu de badges séparés par virgule)
- Nettoyage du formatage du code
