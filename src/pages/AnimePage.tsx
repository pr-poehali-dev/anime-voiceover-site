import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AnimeProject {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: number;
  episodes: number;
  status: 'completed' | 'ongoing';
  trailer?: string;
  seasons?: { name: string; episodes: number[] }[];
}

const animeDatabase: Record<string, AnimeProject> = {
  'sanda': {
    id: 1,
    title: 'SANDA',
    image: 'https://cdn.poehali.dev/files/a63914f718aa4d8bbddd17fbfdcc853f9a9e4185b8404044d5798e7d93e591ca.jpg',
    genre: 'Сёнен, Экшн',
    year: 2025,
    episodes: 12,
    status: 'completed',
    trailer: 'FSZcbWzilPo'
  },
  'dandadan': {
    id: 2,
    title: 'DanDaDan',
    image: 'https://cdn.poehali.dev/files/080f3dd04b6ba2190db80d1281e38c6e.jpg',
    genre: 'Сёнен, Комедия',
    year: 2024,
    episodes: 24,
    status: 'completed',
    trailer: '0XJxfbN36Uw',
    seasons: [
      { name: 'Сезон 1', episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: 'Сезон 2', episodes: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }
    ]
  }
};

const AnimePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(0);

  const anime = id ? animeDatabase[id.toLowerCase()] : null;

  useEffect(() => {
    if (!anime) {
      navigate('/');
    }
  }, [anime, navigate]);

  if (!anime) return null;

  const episodes = anime.seasons 
    ? anime.seasons[selectedSeason].episodes 
    : Array.from({ length: anime.episodes }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/files/Снимок экрана 2025-12-13 140657.png"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        </div>

        <div className="relative container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            className="hover:text-primary mb-4"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад к каталогу
          </Button>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="relative aspect-[2/3] max-w-md mx-auto md:mx-0 overflow-hidden rounded-lg border border-border">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold">{anime.title}</h1>
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {anime.genre}
                  </Badge>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{anime.year}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{anime.episodes} эп.</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">ТРЕЙЛЕР</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${anime.trailer}`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">НАША ОЗВУЧКА</h2>

          <div className="aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${anime.trailer}?start=${selectedEpisode * 10}`}
              title={`Серия ${selectedEpisode}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="space-y-4">
            {anime.seasons && (
              <div className="flex gap-2 mb-4">
                {anime.seasons.map((season, idx) => (
                  <Button
                    key={idx}
                    variant={selectedSeason === idx ? 'default' : 'outline'}
                    className={selectedSeason === idx ? 'bg-primary text-primary-foreground' : 'border-border hover:border-primary'}
                    onClick={() => {
                      setSelectedSeason(idx);
                      setSelectedEpisode(season.episodes[0]);
                    }}
                  >
                    {season.name}
                  </Button>
                ))}
              </div>
            )}
            <h3 className="text-xl font-bold">ВЫБЕРИТЕ СЕРИЮ</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {episodes.map((ep) => (
                <Button
                  key={ep}
                  variant={selectedEpisode === ep ? 'default' : 'outline'}
                  className={selectedEpisode === ep ? 'bg-primary text-primary-foreground' : 'border-border hover:border-primary'}
                  onClick={() => setSelectedEpisode(ep)}
                >
                  {ep}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BEBRADUB
            </h3>
            <p className="text-sm text-muted-foreground">
              Студия озвучки аниме
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
            © 2024 BebraDub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnimePage;