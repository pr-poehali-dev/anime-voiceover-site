import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface AnimeProject {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: number;
  episodes: number;
  status: 'completed' | 'ongoing';
  progress?: number;
}

const animeData: AnimeProject[] = [
  {
    id: 1,
    title: 'Тёмный Путь Героя',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/d42d1ca7-1fb6-4234-b011-133cf290653a.jpg',
    genre: 'Экшен',
    year: 2024,
    episodes: 24,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Кровавые Сумерки',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/33da7c6f-ca8b-41a5-bbff-10a8d2332256.jpg',
    genre: 'Фэнтези',
    year: 2024,
    episodes: 12,
    status: 'ongoing',
    progress: 65
  },
  {
    id: 3,
    title: 'Легенда Алого Меча',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/12470088-143e-46a6-9832-b6879af65496.jpg',
    genre: 'Приключения',
    year: 2023,
    episodes: 36,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Восставший из Тьмы',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/d42d1ca7-1fb6-4234-b011-133cf290653a.jpg',
    genre: 'Триллер',
    year: 2024,
    episodes: 13,
    status: 'ongoing',
    progress: 38
  },
  {
    id: 5,
    title: 'Демоны Полуночи',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/33da7c6f-ca8b-41a5-bbff-10a8d2332256.jpg',
    genre: 'Ужасы',
    year: 2023,
    episodes: 24,
    status: 'completed'
  },
  {
    id: 6,
    title: 'Последний Дракон',
    image: 'https://cdn.poehali.dev/projects/e0a5c4c0-9e43-4139-84d3-055d4e54e00d/files/12470088-143e-46a6-9832-b6879af65496.jpg',
    genre: 'Фэнтези',
    year: 2024,
    episodes: 12,
    status: 'ongoing',
    progress: 50
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const genres = ['all', 'Экшен', 'Фэнтези', 'Приключения', 'Триллер', 'Ужасы'];

  const filteredAnime = animeData.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || anime.genre === selectedGenre;
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'ongoing' && anime.status === 'ongoing') ||
                       (activeTab === 'completed' && anime.status === 'completed');
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/files/Снимок экрана 2025-12-13 140657.png"
            alt="Background"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="mb-8 flex justify-center">
              <h1 
                className="glitch-text text-6xl md:text-8xl font-black tracking-wider mb-2" 
                data-text="BEBRADUB"
                style={{
                  fontFamily: "'Black Ops One', cursive",
                  textShadow: '0 0 20px rgba(128, 0, 0, 0.9), 0 0 40px rgba(128, 0, 0, 0.7), 0 0 60px rgba(128, 0, 0, 0.5), 4px 4px 0px #000000',
                  letterSpacing: '0.15em',
                  color: '#DC2626',
                  WebkitTextStroke: '1px #800000',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))'
                }}
              >
                BEBRADUB
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto italic">
              Делаем что по кайфу, рады если будете с нами)
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть работы
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 font-semibold px-8"
                onClick={() => window.open('https://t.me/bebradub', '_blank')}
              >
                <Icon name="Send" className="mr-2" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск аниме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-card border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'Все жанры' : genre}
                </option>
              ))}
            </select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 bg-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Все проекты
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                В работе
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Завершённые
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnime.map((anime) => (
                  <Card 
                    key={anime.id} 
                    className="group bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3">
                        <Badge variant={anime.status === 'completed' ? 'default' : 'secondary'} className="bg-primary/90 backdrop-blur-sm">
                          {anime.status === 'completed' ? 'Завершено' : 'В работе'}
                        </Badge>
                      </div>
                      {anime.status === 'ongoing' && anime.progress && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-foreground font-semibold">
                              <span>Прогресс озвучки</span>
                              <span>{anime.progress}%</span>
                            </div>
                            <Progress value={anime.progress} className="h-2 bg-muted" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {anime.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                          {anime.genre}
                        </Badge>
                        <span>•</span>
                        <span>{anime.year}</span>
                        <span>•</span>
                        <span>{anime.episodes} эп.</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary">
                СОТРУДНИЧЕСТВО
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                Закажите озвучку
              </h2>
              <p className="text-muted-foreground text-lg">
                Профессиональная озвучка аниме с опытными актёрами и студией звукозаписи
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon name="Mic" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold">Качество</h3>
                <p className="text-sm text-muted-foreground">Профессиональное студийное оборудование</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon name="Zap" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold">Скорость</h3>
                <p className="text-sm text-muted-foreground">Быстрые сроки выполнения заказов</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold">Команда</h3>
                <p className="text-sm text-muted-foreground">Опытные актёры озвучки</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-semibold px-8">
                <Icon name="MessageSquare" className="mr-2" size={20} />
                Telegram
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8">
                <Icon name="Mail" className="mr-2" size={20} />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ANIME VOICE
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Профессиональная студия озвучки аниме
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Send" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
            © 2024 Anime Voice. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;