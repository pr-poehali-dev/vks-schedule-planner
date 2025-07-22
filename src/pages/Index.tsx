import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Meeting {
  id: string;
  title: string;
  time: string;
  date: string;
  participants: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  duration: string;
  type: 'video' | 'audio' | 'webinar';
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAdmin, setIsAdmin] = useState(true); // В реальном проекте получать из контекста авторизации
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Планирование спринта',
      time: '10:00',
      date: '2025-01-22',
      participants: ['Анна Иванова', 'Петр Сидоров', 'Мария Козлова'],
      status: 'upcoming',
      duration: '45 мин',
      type: 'video'
    },
    {
      id: '2', 
      title: 'Ретроспектива команды',
      time: '14:30',
      date: '2025-01-22',
      participants: ['Команда разработки'],
      status: 'ongoing',
      duration: '60 мин',
      type: 'video'
    },
    {
      id: '3',
      title: 'Презентация продукта',
      time: '16:00',
      date: '2025-01-23',
      participants: ['Заказчики', 'Менеджеры'],
      status: 'upcoming',
      duration: '90 мин',
      type: 'webinar'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    participants: '',
    type: 'video' as 'video' | 'audio' | 'webinar'
  });

  const handleCreateMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting: Meeting = {
        id: Date.now().toString(),
        title: newMeeting.title,
        time: newMeeting.time,
        date: newMeeting.date,
        participants: newMeeting.participants.split(',').map(p => p.trim()),
        status: 'upcoming',
        duration: newMeeting.duration,
        type: newMeeting.type
      };
      setMeetings([...meetings, meeting]);
      setNewMeeting({ title: '', date: '', time: '', duration: '', participants: '', type: 'video' });
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const todayMeetings = meetings.filter(meeting => meeting.date === '2025-01-22');
  const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) > new Date('2025-01-22'));

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">ВКС Планировщик</h1>
            <p className="text-slate-600 text-lg">Управление видеоконференциями и встречами</p>
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать встречу
                  </Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Новая встреча</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название встречи</Label>
                  <Input
                    id="title"
                    placeholder="Введите название встречи"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Время</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Длительность</Label>
                    <Input
                      id="duration"
                      placeholder="60 мин"
                      value={newMeeting.duration}
                      onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Тип встречи</Label>
                    <Select value={newMeeting.type} onValueChange={(value: 'video' | 'audio' | 'webinar') => setNewMeeting({...newMeeting, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Видеозвонок</SelectItem>
                        <SelectItem value="audio">Аудиозвонок</SelectItem>
                        <SelectItem value="webinar">Вебинар</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participants">Участники</Label>
                  <Textarea
                    id="participants"
                    placeholder="email@example.com, name@company.com"
                    value={newMeeting.participants}
                    onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreateMeeting} className="w-full bg-blue-600 hover:bg-blue-700">
                  Создать встречу
                </Button>
              </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex items-center gap-3 text-slate-600">
                <Icon name="Shield" size={20} />
                <span className="text-sm">Только администратор может создавать встречи</span>
              </div>
            )}
            
            <Button 
              variant={isAdmin ? "outline" : "default"} 
              onClick={() => setIsAdmin(!isAdmin)}
              size="sm"
            >
              <Icon name={isAdmin ? "UserX" : "UserCheck"} size={16} className="mr-2" />
              {isAdmin ? "Выйти из админки" : "Войти как админ"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Panel - Calendar & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Calendar */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-700">Календарь</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-700">Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Сегодня</span>
                  </div>
                  <span className="font-semibold text-slate-800">{todayMeetings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Активных</span>
                  </div>
                  <span className="font-semibold text-slate-800">{meetings.filter(m => m.status === 'ongoing').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Запланировано</span>
                  </div>
                  <span className="font-semibold text-slate-800">{meetings.filter(m => m.status === 'upcoming').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Today's Meetings */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <Icon name="Calendar" size={24} />
                  Встречи сегодня
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {todayMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(meeting.status)}`}></div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {meeting.time} • {meeting.duration}
                            </span>
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                              <Icon name="Users" size={14} />
                              {meeting.participants.length} участника
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={meeting.status === 'ongoing' ? 'default' : 'secondary'} className="px-3 py-1">
                          {meeting.status === 'ongoing' ? 'В эфире' : 
                           meeting.status === 'upcoming' ? 'Запланировано' : 'Завершено'}
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Icon name="Video" size={16} className="mr-1" />
                          Присоединиться
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <Icon name="CalendarDays" size={24} />
                  Предстоящие встречи
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                        <Icon name={meeting.type === 'webinar' ? 'Presentation' : 'Video'} size={24} className="text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-slate-500">
                              {new Date(meeting.date).toLocaleDateString('ru-RU')} в {meeting.time}
                            </span>
                            <span className="text-sm text-slate-500">{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Icon name="Settings" size={16} className="mr-1" />
                          Настроить
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Share" size={16} className="mr-1" />
                          Пригласить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications Panel */}
            <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardHeader className="border-b border-blue-200">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <Icon name="Bell" size={24} className="text-blue-600" />
                  Система уведомлений
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <Icon name="CheckCircle" size={20} className="text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Автоматические напоминания включены</p>
                      <p className="text-sm text-slate-600 mt-1">Участники получат уведомления за 15 минут до начала встречи</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <Icon name="Mail" size={20} className="text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Email-рассылка активна</p>
                      <p className="text-sm text-slate-600 mt-1">Приглашения и ссылки для подключения отправляются автоматически</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <Icon name="Smartphone" size={20} className="text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Push-уведомления</p>
                      <p className="text-sm text-slate-600 mt-1">Мгновенные уведомления о начале встреч и изменениях в расписании</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;